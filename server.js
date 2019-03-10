var app = require('./app.js');
var db = require('./index.js');

const PORT = process.env.PORT || 5000;

db.connect()
  .then(function() {
    app.listen(PORT, function() {
      console.log('Listening on port: ' + PORT);
    });
  });
