const express = require('express')
// const Event = require("../../module/event.js")
const protectedRoutes=require('../../middleware/protectedRoutes.js')
const Feedback = require('../../module/feedback.js')
const Router = express.Router()

Router.post('/feedbackform',protectedRoutes,async(req,res)=>{
    try {
        const{designation,department,subject,field,feedback}=req.body;
        if(!designation||!department||!subject||!field||!feedback){
            return res.status(404).json({error:"All fields are required"})
        }
        const newFeedback=await Feedback.create({designation,department,subject,field,feedback})
        await newFeedback.save()
        res.status(201).json({message:"Feedback Submited"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Please Login/signup first'})
    }
})




Router.get('/getfeedback',async(req,res)=>{
    try {
        const feedbacks=await Feedback.find()
        // console.log(feedbacks.length)
        if(!feedbacks||feedbacks.length===0){
            return res.status(200).json({message:"No feedbacks to display"})
        }
        res.status(200).json({feedbacks})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal server error'})
    }
})

module.exports=Router