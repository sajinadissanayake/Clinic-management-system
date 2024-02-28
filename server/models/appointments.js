const mongoose = require('mongoose')


const appoSchema = new mongoose.Schema({
   nic:String,
   nic:String, 
   title:String,  
   date:String, 
   time:String,
})

const appoModel = mongoose.model("appointments", appoSchema)
module.exports = appoModel