var mongoose = require('mongoose');

doctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  patients: {
    type: [String],
    required: true
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

// create a doctor model after the doctorSchema
var Doctor = module.exports = mongoose.model("Doctor", doctorSchema);

module.exports.getDoctors = function(callback, limit) {
  Doctor.find(callback).limit(limit);
}

module.exports.getDoctorById = function(id, callback) {
  Doctor.findById(id, callback);
}

module.exports.addDoctor = function(doctor, callback) {
  Doctor.create(doctor, callback);
}
