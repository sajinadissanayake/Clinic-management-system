const mongoose = require('mongoose')

const mexamSchema = new mongoose.Schema({
    
   nic:String,
   age:String,
   weight:String,
   bmi:Number,
   ibw:String,
   wc:String,
   bpressure:String,
   oexam:String,

   
});

    


const mexamModel = mongoose.model("Mexamination", mexamSchema)
module.exports = mexamModel