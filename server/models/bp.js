const mongoose = require('mongoose')

const BpSchema = new mongoose.Schema({
    
   nic:String,
   systolic:String,
   diastolic:String,
  
   Recorddate: {
      type: Date,
      default: Date.now  },

});
 
const BpModel = mongoose.model("bloodPressure", BpSchema)
module.exports = BpModel