var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../../app.js');
var conn = require('../../../index.js');

var Doctor = require('../../../models/doctor');

// default hours for testing purposes
var defaultHours = {
  Day: "Monday",
  startTime: "9:00 AM",
  endTime: "5:00 PM",
  breakStart: "12:30 PM",
  breakEnd: "1:30 PM"
};

var weeklyAvailability = [
  defaultHours,
  defaultHours,
  defaultHours,
  defaultHours,
  defaultHours,
  defaultHours,
  defaultHours
];

describe('POST,GET,UPDATE,DELETE doctors', function() {
  before(function(done) {
    conn.connect().then(function() {
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  after(function(done) {
    conn.connect().then(function() {
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('creating new doctor successful', function(done) {
    request(app).post('/api/doctors')
      .send({ name: 'Michael', weeklyAvailability: weeklyAvailability})
      .then(function(res) {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        expect(body).to.contain.property('weeklyAvailability');
        done();
      })
      .catch(function(err) {
        done(err)
      });
  });

  it('getting doctor successful', function(done) {
    request(app).get('/api/doctors')
      .then(function(res) {
        Doctor.findOne( {name : 'Michael'} ).then(function(doctor) {
          expect(doctor).to.contain.property('_id');
          expect(doctor.name === 'Michael');
          expect(doctor.weeklyAvailability == weeklyAvailability);
          done();
        });
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('updating doctor successful', function(done) {
    Doctor.findOne( { name: 'Michael' } ).then(function(doctor) {
      var id = doctor._id;
      request(app).put('/api/doctors/' + id)
        .send({ name: 'new name!' })
        .then(function(res) {
          const body = res.body;
          expect(body).to.contain.property('_id');
          expect(body.name === 'new name!');
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });

  it('deleting doctor successful', function(done) {
    Doctor.findOne( { name: 'new name!' } ).then(function(doctor) {
      var id = doctor._id;
      request(app).delete('/api/doctors/' + id)
        .then(function(res) {
          expect(res.n === 1);
          expect(res.ok === 1);
          expect(res.deletedCount === 1);
          done();
        })
        .catch(function(err) {
          done(err);
        });
    });
  });
});
