var mongoose = require('mongoose');
var DB_URI = 'mongodb://localhost:27017/luma-health-db';

function connect() {
  return new Promise(function(resolve, reject) {
    if (process.env.NODE_ENV === 'test') {
        var Mockgoose = require('mockgoose').Mockgoose;
        var mockgoose = new Mockgoose(mongoose);

        mockgoose.prepareStorage().then(function() {
          mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true })
          .then(function(res, err) {
            if (err) return reject(err);
              resolve();
            });
          });

    } else {
      mongoose.connect(DB_URI, { useNewUrlParser: true, useCreateIndex: true })
        .then(function(res, err) {
          if (err) return reject(err);
            resolve();
        });
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
