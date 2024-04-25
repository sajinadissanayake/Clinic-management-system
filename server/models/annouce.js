const mongoose = require('mongoose');

const AnnoucementSchema = new mongoose.Schema({
   title: String,
   announcement: String, // corrected spelling here
   doctor: String,
   Date: {
      type: Date,
      default: Date.now
   }
});

const AnnoucementModel = mongoose.model("annoucements", AnnoucementSchema);
module.exports = AnnoucementModel;
