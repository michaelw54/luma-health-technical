var mongoose = require('mongoose');

// import workingHours model
workingHoursSchema = mongoose.Schema({
  Day: {
    type: String,
    required: true
  },
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

doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  // weekly availability is an array of workingHours from Monday to Friday
  // only the first 7 elements of the array are considered
  weeklyAvailability: {
    type: [ workingHoursSchema ],
    required: true
  }
});

// create a doctor model after the doctorSchema
var Doctor = module.exports = mongoose.model("Doctor", doctorSchema);

// get all doctors
module.exports.getDoctors = function(callback, limit) {
  Doctor.find(callback).limit(limit);
}

// get doctor by id
module.exports.getDoctorById = function(id, callback) {
  Doctor.findById(id, callback);
}

// find Doctor by id and update
module.exports.updateDoctor = function(id, doctor, options, callback) {
  var query = { _id: id };
  var update = {
    name: doctor.name,
    weeklyAvailability: doctor.weeklyAvailability
  }
  Doctors.findOneAndUpdate(query, update, options, callback);
}

// add new doctors
module.exports.addDoctor = function(doctor, callback) {
  Doctor.create(doctor, callback);
}

// delete doctor by id
module.exports.deleteDoctor = function(id, callback) {
  var query = { _id: id };
  Doctor.deleteOne(query, callback);
}
