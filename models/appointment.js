var mongoose = require('mongoose');

/* import Patient and Doctor models to allow appointmentSchema to store
   information relating Patient and Doctor
*/
var Patient = require('./patient');
var Doctor = require('./doctor');

// appointment schema
var appointmentSchema = mongoose.Schema({
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  // store patient id
  patient: {
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'Patient'}
  },
  // store doctor id
  doctor: {
    type: {type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'}
  },
  create_date: {
    type: Date,
    default: Date.now
  }
});

var Appointment = module.exports = mongoose.model('Appointment', appointmentSchema);

// get Appointments
module.exports.getAppointments = function(callback, limit) {
  Appointment.find(callback).limit(limit);
}

// get Appointment
module.exports.getAppointmentById = function(id, callback) {
  Appointment.findById(id, callback);
}

module.exports.addAppointment = function(appointment, callback) {
  Appointment.create(appointment, callback);
}

module.exports.updateAppointment = function(id, appointment, options, callback) {
  var query = { _id: id };
  var update = {
    startTime: appointment.startTime,
    endTime: appointment.endTime,
    patient: appointment.patient,
    doctor:  appointment.doctor
  }
  Appointment.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteAppointment = function(id, callback) {
  var query = { _id: id };
  Appointment.deleteOne(query, callback);
}
