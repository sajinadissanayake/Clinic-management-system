const mongoose = require('mongoose');

const ReportRequestSchema = new mongoose.Schema({
   nic: String,
   type: String,
   status: String,
   requestedDate: {
      type: Date,
      default: Date.now
   }
});

const ReportRequestModel = mongoose.model("ReportRequests", ReportRequestSchema);
module.exports = ReportRequestModel;
