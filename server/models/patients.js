const mongoose = require('mongoose')

const patientSchema = new mongoose.Schema({
    name: String,
    nic:String,
    email: String,
    age: Number,
    dob: {
        type: Date,
        default: new Date().setHours(0, 0, 0, 0) // Set time to midnight
    },// Make sure to handle date appropriately
    
    gender: String,
    address: String,
    maritial:String,
    pnumber: Number,
    moh: String,

    phm: String,
    phi: String,
    gnd: String,
    dsd: String,
    neighbour: String,
    education: String,
    physical:String,
    tobacco:String,
    tobaccochew:String,
   alcohol:String,
   other:String,
   snacks:String,
   diseases:String,
   allergies:String,
   registrationDate: {
    type: Date,
    default: Date.now  },
    Image: String,
   

   
});

    


const patientModel = mongoose.model("patients", patientSchema)
module.exports = patientModel