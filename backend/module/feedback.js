// import mongoose from 'mongoose'
const mongoose = require('mongoose')
const feedback = new mongoose.Schema({
       designation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true,
    },
    subject:{
        type:String,
        required:true,
    },
    field:{
        type:String,
        required:true
    },
    feedback:{
        type:String,
        required:true
    }
})

const Feedback = new mongoose.model('Feedback', feedback)

module.exports = Feedback