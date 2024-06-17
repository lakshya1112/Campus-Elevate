// import mongoose from 'mongoose'
const mongoose=require('mongoose')
const user=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    regno:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})

const User=new mongoose.model('User',user)

module.exports=User