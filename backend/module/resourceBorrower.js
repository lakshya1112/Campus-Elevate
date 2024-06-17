// import mongoose from 'mongoose'
const mongoose = require('mongoose')
const borrowedresource = new mongoose.Schema({
    borrower:{   //foreign key
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    resource:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'UserResources'
    },
})

const BorrowedResource = new mongoose.model('BorrowedResource', borrowedresource)

module.exports = BorrowedResource