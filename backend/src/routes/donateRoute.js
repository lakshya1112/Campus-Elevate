const express = require('express')
// const Event = require("../../module/event.js")
const protectedRoutes=require('../../middleware/protectedRoutes.js')
const Donate = require('../../module/donateSchema.js')
const Router = express.Router()

Router.post('/form',async(req,res)=>{
    try {
        const{name,designation,amt}=req.body;
        if(!name||!designation||!amt){
            return res.status(404).json({error:"All fields are required"})
        }
        const newFeedback=await Donate.create({name,designation,amt})
        await newFeedback.save()
        res.status(201).json({message:"Donation form Submited"})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal server error'})
    }
})




Router.get('/getdonation',async(req,res)=>{
    try {
        const feedbacks=await Donate.find()
        // console.log(feedbacks.length)
        if(!feedbacks||feedbacks.length===0){
            return res.status(200).json({message:"No donates to display"})
        }
        res.status(200).json({feedbacks})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:'Internal server error'})
    }
})

module.exports=Router