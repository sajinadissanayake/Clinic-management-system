const mongoose = require('mongoose')

const StaffSchema = new mongoose.Schema({
    
   nic:String,
   utype:String,
   email:String,
   password:String,
  
   
});
 
const StaffModel = mongoose.model("users", StaffSchema)
module.exports = StaffModel