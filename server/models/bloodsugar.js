const mongoose = require('mongoose')

const BSSchema = new mongoose.Schema({
    
   nic:String,
   rbs:String,
   type:String,
   Recorddate: {
      type: Date,
      default: Date.now  },

   specialNotes:String,

});

    


const BSModel = mongoose.model("bloodsugars", BSSchema)
module.exports = BSModel