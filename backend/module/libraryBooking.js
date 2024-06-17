// import mongoose from 'mongoose'
const mongoose = require('mongoose')
const librarybookings = new mongoose.Schema({
    user:{   //foreign key
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    username:{
        type:String,
        required:true
    },
    bookid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Library'
    },
    bookname:{
        type:String,
        required:true
    },
    issueddate:{type:String,required:true},
    duedate:{type:String,required:true}
})

const LibraryBookings = new mongoose.model('LibraryBookings', librarybookings)

module.exports = LibraryBookings