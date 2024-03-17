const mongoose = require('mongoose')

const ReportRequestSchema = new mongoose.Schema({
    
   nic:String,
   type:String,
   status:String,

    requstedDate: {
      type: Date,
      default: Date.now  },


});

    


const ReportRequestModel = mongoose.model("ReportRequests", ReportRequestSchema)
module.exports = ReportRequestModel;