const mongoose = require('mongoose')

const lpSchema = new mongoose.Schema({
    
   nic:String,
   ldl:String,
   hdl:String,
   total:String,
   tcd:String,

  
   Recorddate: {
      type: Date,
      default: Date.now  },

});
 
const lpModel = mongoose.model("LipidProfile", lpSchema)
module.exports = lpModel