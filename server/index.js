require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');
const multer = require('multer');

const patientModel = require('./models/patients');
const reportsModel = require('./models/reports');
const mexamModel = require('./models/mexam');
const BSModel = require('./models/bloodsugar');
const blogModel = require('./models/blog');
const appoModel = require('./models/appointments');
const prescModel = require('./models/presciptions');
const ReportRequestModel = require('./models/ReportRequests')
const RecordRequestModel = require( './models/RecordRequests' )

const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/hospital");


// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get('/', (req, res) => {
    patientModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});



app.get('/getPatient/:id', (req, res) => {
    const id = req.params.id;
    patientModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.get('/getPatient/nic/:nic', (req, res) => {
    console.log
    const nic = req.params.nic;
    patientModel.findOne({ nic: nic }) 
        .then(patient => {
            if (!patient) {
                res.status(404).json({ error: 'Patient not found' });
            } else {
                res.json(patient);
            }
        })
        .catch(err => res.status(500).json({ error: err.message }));
});




app.put('/updatePatient/:id', (req, res) => {
    const id = req.params.id;

    const formattedDate = moment(req.body.dob).format("YYYY-MM-DD");

    patientModel.findByIdAndUpdate({ _id: id }, {
        name: req.body.name,
        nic:req.body.nic,
        email: req.body.email,
        age: req.body.age,
        dob: formattedDate,
        gender: req.body.gender,
        address: req.body.address,
        maritial:req.body.maritial,
        pnumber: req.body.pnumber,
        moh: req.body.moh,
        phm: req.body.phm,
        phi: req.body.phi,
        gnd: req.body.gnd,
        dsd: req.body.dsd,
        neighbour: req.body.neighbour,
        education: req.body.education,
        

        //characteristics

        physical: req.body.physical,
        tobacco: req.body.tobacco,
        tobaccochew: req.body.tobaccochew,
        alcohol: req.body.alcohol,
        other: req.body.other,
        snacks: req.body.snacks,
        diseases:req.body.diseases,
        allergies:req.body.allergies,
        blood:req.body.blood,
       




    })
        .then(users => res.json(users))
        .catch(err => res.json(err));
});

app.delete('/deleteUser/:id', (req, res) => {
    const id = req.params.id;
    patientModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});
// Configure Multer for image upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'patientImages/'); 
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); 
    },
});

const upload = multer({ storage: storage });
const nodemailer = require('nodemailer');

// Other imports and configurations...

app.post("/AddPatient", upload.single('image'), (req, res) => {
    const { name, nic, email, age, dob, gender, address, maritial, pnumber, moh, phm, phi, gnd, dsd, neighbour, education, physical, tobacco, tobaccochew, alcohol, other, snacks, diseases, allergies, blood, sh } = req.body;
    const imagePath = req.file.path; // Path to the uploaded image

    patientModel.create({ name, nic, email, age, dob, gender, address, maritial, pnumber, moh, phm, phi, gnd, dsd, neighbour, education, physical, tobacco, tobaccochew, alcohol, other, snacks, diseases, allergies, blood, sh, imagePath })
        .then(patient => {
            console.log("Patient created:", patient);
            res.json(patient);

            // Sending email to the registered patient
            const transporter = nodemailer.createTransport({
                service: 'Gmail',
                auth: {
                    user: 'clinichealthylifestyle@gmail.com',
                    pass: 'idhz qmax uihy qhjq'
                }
            });

            const mailOptions = {
                from: 'clinichealthylifestyle@gmail.com',
                to: email, // Patient's email
                subject: 'Thank you for registering',
                text: `Dear ${name},\n\nThank you for registering with us.\n\nBest regards,\nYour Healthcare Team`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error sending email:', error);
                } else {
                    console.log('Email sent:', info.response);
                }
            });
        })
        .catch(err => {
            console.error("Error creating patient:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});


////////////////////////////////reports///////////////////////////////////////////////////////////////////////////////
// Configure Multer in reports
const Rstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'reports/'); // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the file name
    },
});


const Rupload = multer({ storage: Rstorage });

app.post('/AddReports', Rupload.single('patientReport'), (req, res) => {
    // Access the uploaded file using req.file
    const { nic } = req.body;
    const { type } = req.body;
    const patientReport = req.file.filename;

    reportsModel.create({ nic,type, patientReport })
        .then(user => res.json(user)) 
        .catch(err => res.json(err));
 
});

// Retrieve reports data
app.get('/getReports', (req, res) => {
    reportsModel.find({})
      .then(reports => res.json(reports))
      .catch(err => res.json(err));
  });
  
  // Serve reports files
  app.use('/reports', express.static('reports'));

//get reports to update page


app.get('/getReports/:id', (req, res) => {
    const id = req.params.id;
    reportsModel.findById({ _id: id })
        .then(report => res.json(report))
        .catch(err => res.json(err));
});
app.put('/updateReport/:id', Rupload.single('patientReport'), (req, res) => {
    const id = req.params.id;
    const { nic } = req.body;
    const {type} = req.body;
    const patientReport = req.file.filename;

    reportsModel.findByIdAndUpdate(id, { nic, patientReport,type })
        .then(report => res.json(report))
        .catch(err => res.json(err));
});

app.delete('/deleteReport/:id', (req, res) => {
    const id = req.params.id;
    reportsModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});
// Retrieve reports by patient NIC
// Route to retrieve reports data associated with a specific NIC
app.get('/getReports/nic/:nic', (req, res) => {
    const { nic } = req.params;
    console.log(nic);
    reportsModel.find({ nic })
      .then(reports => {console.log(reports);res.json(reports)})
      .catch(err => res.status(500).json({ error: 'Error fetching reports', details: err }));
  });
  
  // Route to serve PDF report files
  app.get('/reports/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'reports', filename);
    res.sendFile(filePath);
  });
  

/////////////////////////////////////////////////////////////////////Mexam/////////////////////////////////


app.post("/AddMexam", (req, res) =>{
    mexamModel.create(req.body)
    .then(records => res.json(records))
    .catch(err => res.json(err))
})

// Add a route to get medical examination records by patient NIC
app.get('/getMedicalExaminations/:nic', (req, res) => {
    const nic = req.params.nic;
    mexamModel.find({ nic: nic })
        .then(records => res.json(records))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.get('/getMedicalExamination/:id', (req, res) => {
    const id = req.params.id;
    mexamModel.findById(id) // Use findById to search by _id
        .then(record => res.json(record))
        .catch(err => res.status(500).json({ error: err.message }));
});
// Update a medical examination record
app.put('/updateMedicalExamination/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body; // Data to update
    
    // Find the record by ID and update it
    mexamModel.findByIdAndUpdate(id, updatedData, { new: true })
        .then(updatedRecord => {
            if (!updatedRecord) {
                return res.status(404).json({ error: 'Medical examination record not found' });
            }
            res.json(updatedRecord); // Send back the updated record
        })
        .catch(err => res.status(500).json({ error: err.message }));
});

/////////////////////////////////////////////////////////////////////blood sugar/////////////////////////////////


app.post("/AddBS", (req, res) =>{
    BSModel.create(req.body)
    .then(records => res.json(records))
    .catch(err => res.json(err))
})

// In your Express app
app.get('/getBloodSugarData/:nic', (req, res) => {
    const nic = req.params.nic; // Extract NIC from request parameters
    BSModel.find({ nic: nic }) // Assuming you pass the NIC as a query parameter
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
});
// delete blood sugar
app.delete('/deletebs/:id', (req, res) => {
    const id = req.params.id;
    BSModel.findByIdAndDelete({ _id: id })
        .then(result => res.json(result))
        .catch(err => res.json(err));
});
///////////////////////////////////////////////////////////////Medical/////////////////////////////////////
// Add a route to get medical examination records by patient NIC
app.get('/getmedicals', (req, res) => {
    mexamModel.find({})
      .then(reports => res.json(reports))
      .catch(err => res.json(err));
  });

  // blog image
const bstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'blogposts/'); // Set the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the file name
    },
});

const bupload = multer({ storage: bstorage });
app.post("/Addblog", bupload.single('image'), (req, res) => {
    const { title, content, postedDate, type } = req.body;
    const imagePath = req.file.path; // Path to the uploaded image

    blogModel.create({ title, content, postedDate, type, image: imagePath }) // Corrected the field name to "image"
        .then(blog => {
            console.log("post added:", blog);
            res.json(blog);
        })
        .catch(err => {
            console.error("Error adding blog:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});

////appointments////////////////////////////////////////////////////////////////////////////////////

app.post("/Addappo", async (req, res) => {
    try {
        console.log(req.body);
        const { nic, title, date, email } = req.body;

        // Parse the incoming date string into a JavaScript Date object
        const parsedDate = new Date(date);

        // Find existing appointments on the given date
        const existingAppointments = await appoModel.find({ date: { $gte: parsedDate, $lt: new Date(parsedDate.getTime() + 86400000) } }); // Search for appointments within the same day

        let nextAppointmentTime;

        if (existingAppointments.length === 0) {
            // If no appointments exist for the given date, set the time slot to 7:30 AM
            nextAppointmentTime = parsedDate.setHours(7, 30, 0, 0);
        } else {
            // Calculate the next available appointment time by adding 6 minutes to the last appointment time
            const lastAppointmentTime = existingAppointments[existingAppointments.length - 1].date;
            nextAppointmentTime = new Date(lastAppointmentTime.getTime() + 6 * 60000).toISOString();
        }

        // Ensure the next appointment time does not exceed 12:30 PM
        const endTime = new Date(parsedDate).setHours(12, 30, 0, 0);
        if (nextAppointmentTime > endTime) {
            throw new Error('Cannot add more appointments for this date. Appointments are full.');
        }

        // Create the new appointment
        const newAppointment = await appoModel.create({ nic, title, date: nextAppointmentTime });

        // Send email to the patient
        sendAppointmentEmail(email, parsedDate);

        res.json(newAppointment);
    } catch (error) {
        console.error('Error creating appointment:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Function to send an appointment confirmation email to the patient
const sendAppointmentEmail = (recipientEmail, appointmentDate) => {
    // Create a Nodemailer transporter
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'clinichealthylifestyle@gmail.com', // Your Gmail email address
            pass: 'idhz qmax uihy qhjq' // Your Gmail password
        }
    });

    // Email content
    const mailOptions = {
        from: 'clinichealthylifestyle@gmail.com', // Your Gmail email address
        to: recipientEmail, // Patient's email address
        subject: 'Appointment Confirmation',
        text: `Dear Patient,\n\nYour next clinic date is scheduled for ${appointmentDate}.\n\nBest regards,\n Healthy Lifestyle Clinic`
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};


  // Define a route to fetch all appointments
app.get('/getAppointments', async (req, res) => {
    try {
      const appointments = await appoModel.find({});
      res.json(appointments);
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
////Prescriptions////////////////////////////////////////////////////////////////////////////////////


app.post("/AddPrescription", (req, res) =>{
    prescModel.create(req.body)
    .then(records => res.json(records))
    .catch(err => res.json(err))
})

app.get('/getPrescriptions/:nic', (req, res) => {
    const nic = req.params.nic;
    prescModel.find({ nic: nic })
        .then(prescriptions => res.json(prescriptions))
        .catch(err => res.status(500).json({ error: err.message }));
});


// Add a new endpoint to get a single prescription by ID
app.get('/getPrescription/:id', (req, res) => {
    const id = req.params.id;
    prescModel.findById(id)
        .then(prescription => res.json(prescription))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Retrieve all prescriptions
app.get('/getPrescriptions', (req, res) => {
    prescModel.find({})
        .then(prescriptions => res.json(prescriptions))
        .catch(err => res.status(500).json({ error: err.message }));
});

// Add a new endpoint to update a prescription by ID
app.put('/updatePrescription/:id', (req, res) => {
    const id = req.params.id;
    const { prescription } = req.body;

    prescModel.findByIdAndUpdate(id, { prescription })
        .then(updatedPrescription => res.json(updatedPrescription))
        .catch(err => res.status(500).json({ error: err.message }));
});

app.put('/updatePrescriptionStatus/:id', (req, res) => {
    const id = req.params.id;
    const { status } = req.body;

    prescModel.findByIdAndUpdate(id, { status })
        .then(updatedPrescription => res.json(updatedPrescription))
        .catch(err => res.status(500).json({ error: err.message }));
});


app.delete('/deletePrescription/:id', (req, res) => {
    const id = req.params.id;
    prescModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});


app.post("/AddReportRequest", (req, res) => {
    const { nic, type ,status} = req.body;

    // Create a new report request using the ReportRequestModel
    ReportRequestModel.create({ nic, type,status })
        .then(reportRequest => {
            console.log("Report request created:", reportRequest);
            res.json(reportRequest);
        })
        .catch(err => {
            console.error("Error creating report request:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
app.get('/getReportRequests/:nic', async (req, res) => {
    try {
        const { nic } = req.params;
        const reportRequests = await ReportRequestModel.find({ nic, status: "pending" });
        res.json(reportRequests);
    } catch (error) {
        console.error('Error fetching report requests:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
// Route to fetch all lab requests
app.get('/getLabRequests', async (req, res) => {
    try {
        const labRequests = await ReportRequestModel.find();
        res.json(labRequests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.put('/updateReportRequest/:id', async (req, res) => {
    try {
      const { id } = req.params;
  
      // Update report request status to "added"
      await ReportRequestModel.findByIdAndUpdate(id, { status: 'added' });
  
      res.status(200).send('Report request status updated successfully');
    } catch (error) {
      console.error('Error updating report request status:', error);
      res.status(500).send('Internal Server Error');
    }
  });
// Add a route to delete report request
app.delete('/deleteReportRequest/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Find the report request by ID and delete it
        await ReportRequestModel.findByIdAndDelete(id);

        res.status(200).send('Report request deleted successfully');
    } catch (error) {
        console.error('Error deleting report request:', error);
        res.status(500).send('Internal Server Error');
    }
});


  /////////////////////records//////////////////////////////////////////
  app.post("/AddRecordRequest", (req, res) => {
    const { nic, type ,status} = req.body;

    // Create a new report request using the ReportRequestModel
    RecordRequestModel.create({ nic, type,status })
        .then(recordRequest => {
            console.log("Record request created:", recordRequest);
            res.json(recordRequest);
        })
        .catch(err => {
            console.error("Error creating record request:", err);
            res.status(500).json({ error: 'Internal Server Error' });
        });
});
app.get('/getRecordRequests/:nic', async (req, res) => {
    try {
        const { nic } = req.params;
        const recordRequests = await RecordRequestModel.find({ nic, status: "pending" });
        res.json(recordRequests);
    } catch (error) {
        console.error('Error fetching record requests:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//  route to delete record request
app.delete('/deleteRecordRequest/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        //  record request by ID and delete 
        await RecordRequestModel.findByIdAndDelete(id);

        res.status(200).send('Record request deleted successfully');
    } catch (error) {
        console.error('Error deleting record request:', error);
        res.status(500).send('Internal Server Error');
    }
});

////////////////////////////////////bp/////////////////////////////////////////////

// Route to handle saving blood pressure data
const BpModel = require( './models/bp' )
app.post("/AddBp", (req, res) =>{
    BpModel.create(req.body)
    .then(records => res.json(records))
    .catch(err => res.json(err))
})
app.get('/getBloodpressure/:nic', (req, res) => {
    const nic = req.params.nic; 
    BpModel.find({ nic: nic }) 
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
});  

app.delete('/deleteBloodpressure/:id', async (req, res) => {
    try {
       
        const { id } = req.params;

        
        const deletedRecord = await BpModel.findByIdAndDelete(id);

        if (!deletedRecord) {
            
            return res.status(404).json({ message: 'Record not found' });
        }

       
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
        
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



///////////////////////////article sender

app.post('/sendArticleToPatients', async (req, res) => {
    try {
        const { subject, text, image } = req.body;

        const patients = await patientModel.find({}, 'email');

        const emailTasks = patients.map(patient => {
            return new Promise((resolve, reject) => {
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: 'clinichealthylifestyle@gmail.com',
                    pass: 'idhz qmax uihy qhjq'
                    }
                });

                const mailOptions = {
                    from: 'clinichealthylifestyle@gmail.com', 
                    to: patient.email, 
                    subject: subject,
                    text: text,
                    html: `<p>${text}</p>` 
                };

                
                if (image) {
                    mailOptions.attachments = [{
                        filename: 'image.jpg',
                        path: image.path
                    }];
                }

                // Send email
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error('Error sending email:', error);
                        reject(error);
                    } else {
                        console.log('Email sent:', info.response);
                        resolve(info.response);
                    }
                });
            });
        });

        // Wait for all email tasks to complete
        await Promise.all(emailTasks);

        res.status(200).json({ message: 'Articles sent to all patients successfully' });
    } catch (error) {
        console.error('Error sending articles to patients:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


///////////////////////////////////////////////////////////////////////////////////////
// Route to handle saving blood pressure data
const lpModel = require( './models/lp' )
app.post("/Addlp", (req, res) =>{
    lpModel.create(req.body)
    .then(records => res.json(records))
    .catch(err => res.json(err))
});
app.get('/getLp/:nic', (req, res) => {
    const nic = req.params.nic; 
    lpModel.find({ nic: nic }) 
        .then(data => res.json(data))
        .catch(err => res.status(500).json({ error: err.message }));
});  
app.delete('/deletelp/:id', async (req, res) => {
    try {
        
        const { id } = req.params;

        
        const deletedRecord = await lpModel.findByIdAndDelete(id);

        if (!deletedRecord) {
            
            return res.status(404).json({ message: 'Record not found' });
        }
        
        res.json({ message: 'Record deleted successfully' });
    } catch (error) {
       
        console.error('Error deleting record:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


///////////////////////////////

const AnnoucementModel = require( './models/annouce' )
app.post("/AddAnnoucement", (req, res) =>{
    AnnoucementModel.create(req.body)
    .then(records => res.json(records))
    .catch(err => res.json(err))
});

app.get('/getAnnouncement', (req, res) => {
    AnnoucementModel.find({})
      .then(records => res.json(records))
      .catch(err => res.status(500).json({ error: err.message }));
  });
  
   /////////////////////////////////////////////////////////
  const bodyParser = require('body-parser');

  
  // Replace with your actual API key from Anthropic
  const OpenAI =require("openai");

  const openai = new OpenAI({
    apiKey:"sk-proj-VnLQk01tCBMv0WWEs4cfT3BlbkFJNeEDZQ6cAKmNtWB1RO5s"
  });
  app.use(bodyParser.json());
  
  app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
  
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        prompt: message,
        max_tokens: 30,
      });

      res.json({ message: response.data.choices[0].text });

     
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while processing your request.' });
    }
  });
  
/////////////////////////
 



 


app.listen(3001, () => {
    console.log("server is running");
});
