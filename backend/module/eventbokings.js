// import mongoose from 'mongoose'
const mongoose = require('mongoose')
const eventBookings = new mongoose.Schema({
    user:{   //foreign key
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    username:{
        type:String,
        required:true
    },
    eventid: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Event'
    },
    eventname:{
        type:String,
        required:true
    },
    uid:{
        type:String,
        required:true,
        unique:true
    }
})

const EventBookings = new mongoose.model('EventBookings', eventBookings)

module.exports = EventBookings