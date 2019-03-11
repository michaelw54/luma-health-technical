var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../../app.js');
var conn = require('../../../index.js');

var Patient = require('../../../models/patient');

describe('POST,GET,UPDATE,DELETE patients', function() {
  before(function(done) {
    conn.connect().then(function() {
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  after(function(done) {
    conn.close().then(function() {
      done();
    }).catch(function(err) {
      done(err);
    });
  });

  it('creating new patient successful', function(done) {
    request(app).post('/api/patients')
      .send({ name: 'Karen' })
      .then(function(res) {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        done();
      })
      .catch(function(err) {
        done(err)
      });
  });

  it('getting patient successful', function(done) {
    request(app).get('/api/patients')
      .then(function(res) {
        Patient.findOne( {name : 'Karen'} ).then(function(patient) {
          expect(patient).to.contain.property('_id');
          expect(patient.name === 'Karen');
          done();
        });
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('updating patient successful', function(done) {
    Patient.findOne( { name: 'Karen' } ).then(function(patient) {
      var id = patient._id;
      request(app).put('/api/patients/' + id)
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

  it('deleting patient successful', function(done) {
    Patient.findOne( { name: 'new name!' } ).then(function(patient) {
      var id = patient._id;
      request(app).delete('/api/patients/' + id)
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
