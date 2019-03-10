var mongoose = require('mongoose');

patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

// create patient model
var Patient = module.exports = mongoose.model("Patient", patientSchema);

// get patients
module.exports.getPatients = function(callback, limit) {
  Patient.find(callback).limit(limit);
}

module.exports.getPatientById = function(id, callback) {
  Patient.findById(id, callback);
}

module.exports.addPatient = function(patient, callback) {
  Patient.create(patient, callback);
}

module.exports.updatePatient = function(id, patient, options, callback) {
  var query = { _id: id };
  var update = {
    name: patient.name
  }
  Patient.findOneAndUpdate(id, update, options, callback);
}

module.exports.deletePatient = function(id, callback) {
  var query = { _id: id };
  Patient.findOneAndDelete(query, callback);
}
