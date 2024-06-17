// import mongoose from 'mongoose'
const mongoose = require('mongoose')
const userResources = new mongoose.Schema({
    Resourcename: {
        type: String,
        required: true
    },
    ResourceCategory: {
        type: String,
        required: true,
    },
    // resourceImage:{
    //     type:String,
    //     required:true,
    // },
    resourceDescription:{
        type:String,
    }
})

const UserResources = new mongoose.model('UserResources', userResources)

module.exports = UserResources