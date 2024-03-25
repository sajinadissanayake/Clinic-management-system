const mongoose = require('mongoose');

const RecordRequestSchema = new mongoose.Schema({
   nic: String,
   type: String,
   status: String,
   requestedDate: {
      type: Date,
      default: Date.now
   }
});

const RecordRequestModel = mongoose.model("RecordRequests", RecordRequestSchema);
module.exports = RecordRequestModel;
