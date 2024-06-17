const mongoose = require('mongoose')

const library =new mongoose.Schema({
    bookName: { type: String, require: true, },
    category: { type: String, required: true },
    author: { type: String, required: true },
})

const Library=new mongoose.model('Library',library)
module.exports=Library