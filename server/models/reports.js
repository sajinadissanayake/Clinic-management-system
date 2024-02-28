const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    nic: String,
    type:String,
    
    patientReport:String,
    uploadDate: {
        type: Date,
        default: Date.now  },
})

const reportsModel = mongoose.model("reports", reportSchema)
module.exports = reportsModel
