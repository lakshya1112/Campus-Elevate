const express = require('express')
const Event = require("../../module/event.js")
const protectedRoutes=require('../../middleware/protectedRoutes.js')
const EventBookings = require('../../module/eventbokings.js')
const Router = express.Router()

//generate event
Router.post('/postevent',protectedRoutes, async (req, res) => {
    try {
        const { eventname,eventocassion, eventdescription, eventcategory,eventvenue, eventday, eventtimmings, eventimg } = req.body
        if (!eventname || !eventocassion|| !eventdescription || !eventcategory|| !eventvenue || !eventday || !eventtimmings || !eventimg) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const newEvent = await Event.create({ eventocassion,eventname, eventdescription, eventcategory,eventvenue, eventday, eventtimmings, eventimg })
        res.status(200).json({ message: "Event generated" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

//getevent
Router.get('/getevent', async (req, res) => {
    try {
        const allevents= await Event.find()
        if(!allevents||allevents.length===0){
            return res.status(200).json({message:"No events to show"})
        }
        res.status(200).json({allevents})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})


//userevent
Router.get('/getuserevent',protectedRoutes,async(req,res)=>{
    try {
        // const{user,eventid}=req.body
        console.log(req.user._id)
        const userevent=await EventBookings.find({user:req.user._id}).select('-_id -user -username -eventid');
        if(!userevent||userevent.length===0){
            res.status(200).json({message:"No events to display"})
        }
        res.status(200).json(userevent)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

//eventBooking
Router.post('/bookevent/:id',protectedRoutes,async(req,res)=>{
    try {

        function generateUnique4DigitNumber() {
            const year = 2024;
            const min = 1000; // Minimum 4-digit number
            const max = 9999; // Maximum 4-digit number
        
            const generatedNumbers = new Set(); // Keep track of generated numbers
        
            // Generate a random 4-digit number and combine it with the year
            function generateNumber() {
                return year * 10000 + Math.floor(Math.random() * (max - min + 1)) + min;
            }
        
            let uniqueNumber;
            do {
                uniqueNumber = generateNumber();
            } while (generatedNumbers.has(uniqueNumber)); // Regenerate if the number is not unique
        
            // Add the unique number to the set of generated numbers
            generatedNumbers.add(uniqueNumber);
        
            return uniqueNumber;
        }
        
        // Example usage
        const uniqueNumber1 = generateUnique4DigitNumber().toString();
        console.log(uniqueNumber1)
        // console.log(uniqueNumber);
        
        const {id:eventid}=req.params;
        console.log(eventid)
        const eventdata=await Event.findOne({_id:eventid})
        if(!eventdata){
            return res.status(404).json({error:"Event doesnt exist"})
        }
        // console.log(eventdata)
        const newbooking= await EventBookings.create({
            user:req.user._id,
            username:req.user.name,
            eventid,
            eventname:eventdata.eventname,
            uid:uniqueNumber1
        })
        await newbooking.save()
        res.json({newbooking})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})
module.exports = Router