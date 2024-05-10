const mongoose = require('mongoose')

const feedSchema = new mongoose.Schema({
    
   name:String,
   email:String,
   comment:String,
   
   Date: {
      type: Date,
      default: Date.now  },

   

});

    


const feedModel = mongoose.model("Feedbacks", feedSchema)
module.exports = feedModel