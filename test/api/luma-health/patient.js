var expect = require('chai').expect;
var request = require('supertest');

var app = require('../../../app.js');
var conn = require('../../../index.js');

describe('POST patients', function() {
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

  it('creating new patient successful', function(done) {
    request(app).post('/api/appointments')
      .send({ name: "billy bob joe" })
      .then(function(res) {
        const body = res.body;
        expect(body).to.contain.property('_id');
        expect(body).to.contain.property('name');
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });

  it('creating new patient failed', function(done) {
    request(app).post('/api/appointments')
      .send({ name: "billy bob joe" })
      .then(function(res) {
        const body = res.body;
        expect(body.errors.text.name)
          .to.equal('ValidatorError')
        done();
      })
      .catch(function(err) {
        done(err);
      });
  });
});
