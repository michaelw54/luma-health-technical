var mongoose = require('mongoose');

// create data structure for range of working hours
workingHoursSchema = mongoose.Schema({
  // empty if doctor doesn't work that day
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  // used for breaks in between work shift
  breakStart: {
    type: String
  },
  breakEnd: {
    type: String
  }
});

// create a workingHours model but don't export it
var workingHours = module.exports = mongoose.model("workingHours", workingHoursSchema);

// create new working hours to create Doctor object
module.exports.addWorkingHours = function(workingHours, callback) {
  workingHours.create(workingHours, callback);
}
