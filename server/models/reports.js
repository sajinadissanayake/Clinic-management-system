const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    nic: String,
    
    patientReport:String,
    uploadDate: {
        type: Date,
        default: Date.now  },
})

const reportsModel = mongoose.model("reports", reportSchema)
module.exports = reportsModel
