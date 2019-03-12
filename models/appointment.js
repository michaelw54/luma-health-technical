var mongoose = require('mongoose');

// to prevent messages about the useFindandModify method being deprecated
mongoose.set('useFindAndModify', false);

/* import Patient and Doctor models to allow appointmentSchema to store
   information relating Patient and Doctor
*/
var Patient = require('./patient');
var Doctor = require('./doctor');

patientSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  }
});

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
    type: patientSchema
  },
  // store doctor id
  doctor: {
    type: doctorSchema
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

module.exports.getAppointmentsByDoctorName = function(doctorName, callback) {
  Appointment.find({ doctor: { $elemMatch: { name: doctorName } } }, callback);
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
  Appointment.findOneAndDelete(query, callback);
}
