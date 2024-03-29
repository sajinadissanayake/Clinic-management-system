const mongoose = require('mongoose')


const appoSchema = new mongoose.Schema({
   nic:String,

   title:String,  
   date:Date, 
  
})

const appoModel = mongoose.model("appointments", appoSchema)
module.exports = appoModel