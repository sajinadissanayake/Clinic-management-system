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
        cb(null, 'patientImages/'); // Set the destination folder for uploaded images
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Set the file name
    },
});

const upload = multer({ storage: storage });

app.post("/AddPatient", upload.single('image'), (req, res) => {
    const { name, nic, email, age, dob, gender, address, maritial, pnumber, moh, phm, phi, gnd, dsd, neighbour, education, physical, tobacco, tobaccochew, alcohol, other, snacks, diseases, allergies,blood,sh } = req.body;
    const imagePath = req.file.path; // Path to the uploaded image

    patientModel.create({ name, nic, email, age, dob, gender, address, maritial, pnumber, moh, phm, phi, gnd, dsd, neighbour, education, physical, tobacco, tobaccochew, alcohol, other, snacks, diseases, allergies,blood,sh, imagePath })
        .then(patient => {
            console.log("Patient created:", patient);
            res.json(patient);
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
// Retrieve reports by patient NIC



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
app.get('/getMedicalExaminations/:id', (req, res) => {
    const nic = req.params.nic;
    mexamModel.find({ id: id })
        .then(records => res.json(records))
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

app.post("/Addappo", (req, res) =>{
    appoModel.create(req.body)
    .then(users => res.json(users))
    .catch(err => res.json(err))
})


////appointments////////////////////////////////////////////////////////////////////////////////////


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


















app.listen(3001, () => {
    console.log("server is running");
});
