const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const moment = require('moment');
const multer = require('multer');

const patientModel = require('./models/patients');
const reportsModel = require('./models/reports');

const app = express();
app.use(cors());
app.use(express.json());


mongoose.connect("mongodb://localhost:27017/hospital");

app.get('/', (req, res) => {
    patientModel.find({})
        .then(users => res.json(users))
        .catch(err => res.json(err));
});
// pa


app.get('/getPatient/:id', (req, res) => {
    const id = req.params.id;
    patientModel.findById({ _id: id })
        .then(users => res.json(users))
        .catch(err => res.json(err));
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
app.post("/AddPatient", (req, res) => {
    console.log(req.body); // Check if the data is being received
    patientModel.create(req.body)
        .then(users => {
            console.log("patient created:", users);
            res.json(users);
        })
        .catch(err => {
            console.error("Error creating patient:", err);
            res.json(err); 
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
    const patientReport = req.file.filename;

    reportsModel.create({ nic, patientReport })
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
    const patientReport = req.file.filename;

    reportsModel.findByIdAndUpdate(id, { nic, patientReport })
        .then(report => res.json(report))
        .catch(err => res.json(err));
});

app.delete('/deleteReport/:id', (req, res) => {
    const id = req.params.id;
    reportsModel.findByIdAndDelete(id)
        .then(result => res.json(result))
        .catch(err => res.json(err));
});



app.listen(3001, () => {
    console.log("server is running");
});
