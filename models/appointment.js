var mongoose = require('mongoose');

// appointment schema
var appointmentSchema = mongoose.Schema({
  date:{
    type: Date,
    required: true
  },
  patient:{
    // temporary
    type: String,
    required: true
  },
  doctor:{
    // temporary
    type: String,
    required: true
  },
  create_date:{
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
    date: appointment.date,
    patient: appointment.patient,
    doctor:  appointment.doctor
  }
  Appointment.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteAppointment = function(id, callback) {
  var query = { _id: id };
  Appointment.deleteOne(query, callback);
}
