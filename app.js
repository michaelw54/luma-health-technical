var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(bodyParser.json());

var Appointment = require('./models/appointment');
var Patient = require('./models/patient');
var Doctor = require('./models/doctor');

// connect to mongoose
// mongoose.connect('mongodb://localhost:27017/luma-health-db', { useNewUrlParser: true });
// var db = mongoose.connection;

app.get('/', function(req, res) {
  res.send('Navigate to /api/doctors or /api/appointments');
});

// retrieve all appointments information
app.get('/api/appointments', function(req, res) {
  Appointment.getAppointments(function(err, appointments) {
    if (err) {
      throw err;
    }
    res.json(appointments);
  });
});

// get appointment by id
// app.get('/api/appointments/:_id', function(req, res) {
//   Appointment.getAppointmentById(req.params._id, function(err, appointment) {
//     if (err) {
//       throw err;
//     }
//     res.json(appointment);
//   });
// });

// get appointment by doctor name
app.get('/api/appointments/:doctorName', function(req, res) {
  Appointment.getAppointmentsByDoctorName(req.params.doctorName, function(err, appointment) {
    if (err) {
      throw err;
    }
    res.json(appointment);
  });
});

// add new appointment
app.post('/api/appointments', function (req, res) {
  var appointment = req.body;
  Appointment.addAppointment(appointment, function(err, appointment) {
    if (err) {
      throw err;
    }
    res.json(appointment);
  });
});

// update appointment by id
app.put('/api/appointments/:_id', function(req, res) {
  var id = req.params._id;
  var appointment = req.body;
  Appointment.updateAppointment(id, appointment, {}, function(err, appointment) {
    if (err) {
      throw err;
    }
    res.json(appointment);
  });
});

// delete appointment by id
app.delete('/api/appointments/:_id', function(req, res) {
  var id = req.params._id;
  Appointment.deleteAppointment(id, function(err, appointment) {
    if (err) {
      throw err;
    }
    res.json(appointment);
  });
});

// retrieve all patients information
app.get('/api/patients', function(req, res) {
  Patient.getPatients(function(err, patients) {
    if (err) {
      throw err;
    }
    res.json(patients);
  });
});

app.get('/api/patients/:name', function(req, res) {
  Patient.getPatientsByName(req.params.name, function(err, patients) {
    if (err) {
      throw err;
    }
    res.json(patients);
  });
})

// get patient by id
// app.get('api/patients/:_id', function(req, res) {
//   Patient.getPatientById(req.params._id, function(err, patient) {
//     if (err) {
//       throw err;
//     }
//     res.json(patient);
//   });
// });

// create patient
app.post('/api/patients', function(req, res) {
  var patient = req.body
  Patient.addPatient(patient, function(err, patient) {
    if (err) {
      throw err;
    }
    res.json(patient);
  });
});

// update patient by id
app.put('/api/patients/:_id', function(req, res) {
  var id = req.params._id;
  var patient = req.body;
  Patient.updatePatient(id, patient, {}, function(err, patient) {
    if (err) {
      throw err;
    }
    res.json(patient);
  });
});

// delete patient by id
app.delete('/api/patients/:_id', function(req, res) {
  var id = req.params._id;
  Patient.deletePatient(id, function(err, patient) {
    if (err) {
      throw err;
    }
    res.json(patient);
  });
});

// retrieve all doctors
app.get('/api/doctors', function(req, res) {
  Doctor.getDoctors(function(err, doctors) {
    if (err) {
      throw err;
    }
    res.json(doctors);
  });
});

// get doctor by id
// app.get('/api/doctors/:_id', function(req, res) {
//   Doctor.getDoctorById(req.params._id, function(err, doctor) {
//     if (err) {
//       throw err;
//     }
//     res.json(doctor);
//   });
// });

// get doctors by name
app.get('/api/doctors/:name', function(req, res) {
  Doctor.getDoctorsbyName(req.params.name, function(err, doctor) {
    if (err) {
      throw err;
    }
    res.json(doctor);
  });
});

// update doctor by id
app.put('/api/doctors/:_id', function(req, res) {
  var id = req.params._id;
  Doctor.updateDoctor(id, req.body, {}, function(err, doctor) {
    if (err) {
      throw err;
    }
    res.json(doctor);
  });
});

// add new doctor
app.post('/api/doctors', function(req, res) {
  var doctor = req.body;
  Doctor.addDoctor(doctor, function(err, doctor) {
    if (err) {
      throw err;
    }
    res.json(doctor);
  });
});

// delete doctor by id
app.delete('/api/doctors/:_id', function(req, res) {
  var id = req.params._id;
  Doctor.deleteDoctor(id, function(err, doctor) {
    if (err) {
      throw err;
    }
    res.json(doctor);
  });
});

app.listen(3000);
console.log('Running on port 3000...');
module.exports = app;
