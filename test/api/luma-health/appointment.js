var mongoose = require('mongoose');
var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../../app.js');
var conn = require('../../../index.js');

var Appointment = require('../../../models/appointment');
var Patient = require('../../../models/patient');
var Doctor = require('../../../models/doctor');

// default hours for the purpose of testing
var defaultHours = {
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

describe('POST, GET, UPDATE, DELETE appointments', function() {
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

  it('creating new appointment successful', function(done) {
    request(app).post('/api/appointments')
      .send({ startTime: new Date('December 17, 1995 03:24:00'),
              endTime: new Date('December 17, 2005 03:24:00'),
              patient: { name: 'Aaron' },
              doctor: { name: 'Joe', weeklyAvailability: weeklyAvailability }
          })
      .then(function(res) {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('startTime');
        expect(body).to.contain.property('endTime');
        expect(body).to.contain.property('patient');
        expect(body).to.contain.property('doctor');
        done();
      })
      .catch(function(err) {
        done(err)
      });
  });

  it('getting appointment successful', function(done) {
    request(app).get('/api/appointments')
      .then(function(res) {
        Appointment.findOne( { startTime: new Date('December 17, 1995 03:24:00')} ).then(function(appointment) {
          expect(appointment.doctor.name === 'Joe');
          expect(appointment.endTime === new Date('December 17, 2005 03:24:00'));
        });
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});
