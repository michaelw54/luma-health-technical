# Luma Technical Assessment

A REST Api designed to manage doctor schedules, keep track of patient information, and schedule appointments.

## Key Functionalities
-- manage availability of doctors
-- book an appointment with a doctor, specifying starting time and ending time
-- find patients and their personal information
-- track appointments and check appointment details

## Instructions

### Set up MongoDB
run the following commands in separate shells
```
mongod
mongo --host localhost:27017
```

### Start the server
run the following command in the project's root directory
```
npm start
```

### API usage

#### Adding doctor

```
POST http://localhost:3000/api/doctors
```  
```
{ name: doctor's name,
  weeklyAvailability: [
    {
      Day: day of week,
      startTime: beginning of shift,
      endTime: end of shift,
      breakStart: beginning of break during work shift,
      breakEnd: end of break during work shift,
    },
    ...
    ...
    ...
  ]
}
```  

Doctors can be added given just a name if weekly availability is not for certain, or is subject to change.


#### Viewing doctor information

To get a list of every doctor
 `GET` request.    
```
GET http://localhost:3000/api/doctors
```

To get a list of doctors queried by name
`GET` request.
```
GET http://localhost:3000/api/doctors/DOCTOR-NAME
```


#### Adding patient

```
POST http://localhost:3000/api/patients
```
```
{
  name: patient name
}
```

#### View patient information

To get a list of every patient  
```
GET http://localhost:3000/api/patients
```

To get a list patients queried by name
```
GET http://localhost:3000/api/patients/PATIENT-NAME
```

#### Booking appointments

To book an appointment with a doctor, use the `POST` request as below.
```
POST http://localhost:3000/api/appointments
```

Here is how the body should be structured:
```
{
	startTime: begin time of appointment in DATE format,
	endTime: end time of appointment in DATE format,
  	patient: {
		name: patient name
	},
  	doctor: {
    	name: doctor name,
      weeklyAvailability: [
			{
          Day: day of week,
          startTime: beginning of shift,
          endTime: end of shift,
          breakStart: beginning of break during work shift,
          breakEnd: end of break during work shift
			},
      ...
      ...
      ...
		]
  	}
  }
```

An example of the body could look something like this:
```
{
	"startTime": "December 17, 1995 03:24:00",
	"endTime": "December 17, 1995 03:24:00",
  	"patient": {
		"name": "testPatient"
	},
  "doctor": {
    "name": "testDoctor",
    "weeklyAvailability": [
			{
  				"Day": "Monday",
  				"startTime": "9:00 AM",
  				"endTime": "5:00 PM",
  				"breakStart": "12:30 PM",
  				"breakEnd": "1:30 PM"
			},
			{
  				"Day": "Tuesday",
  				"startTime": "9:00 AM",
  				"endTime": "5:00 PM",
  				"breakStart": "12:30 PM",
  				"breakEnd": "1:30 PM"
			},
			{
  				"Day": "Wednesday",
  				"startTime": "9:00 AM",
  				"endTime": "5:00 PM",
  				"breakStart": "12:30 PM",
  				"breakEnd": "1:30 PM"
			}
	  ]
  }
}
```
All fields in weeklyAvailability are strings, where Day can be expressed as { Monday, Tuesday, Wednesday, ... Sunday }, since the start and end of shifts are expected to reoccur over multiple weeks.
startTime and endTime of an appointment expect Date objects because unique appointments occur only once.

#### View appointments

To fetch all the appointments in a JSON, use the `GET` request as below.  
```
GET http://localhost:3000/appointments
```

To fetch appointments under a doctor's name
```
GET http://localhost:3000/appointments/DOCTOR-NAME
```

### Testing
To run the tests, run the following command in the project's root directory.
```
npm test
```

## Tools used

* REST API: Node.JS, Express  
* Database: MongoDB, Mongoose  
* Unit Tests: Mocha, Chai


## Limitations

* Support only for routine working hours, inflexible and difficult to maintain a working calendar.
* Duplicates are not detected, identical patients and doctors can be inserted into the database multiple times.
* Currently, there are no other query options for patients, doctors, and appointments other than by patient name and doctor name.
