const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: String,
    content:String,
    type:String,
    PostedDate: {
    type: Date,
    default: Date.now  },
    image: String,
      
});

    


const blogModel = mongoose.model("blogposts", blogSchema)
module.exports = blogModel