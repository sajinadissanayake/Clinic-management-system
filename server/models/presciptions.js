const mongoose = require('mongoose')

const prescSchema = new mongoose.Schema({
    prescription: String,
    nic:String,
    PostedDate: {
    type: Date,
    default: Date.now  },
   
});

    


const prescModel = mongoose.model("prescriptions", prescSchema)
module.exports = prescModel