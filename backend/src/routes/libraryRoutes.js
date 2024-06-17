const express = require('express')
const Library = require("../../module/librarySchema.js")
const protectedRoutes=require('../../middleware/protectedRoutes.js')
const LibraryBookings = require('../../module/libraryBooking.js')
const Router = express.Router()

//getbooks
Router.get('/getbooks', async (req, res) => {
    try {
        const allbooks= await Library.find()
        if(!allbooks||allbooks.length===0){
            return res.status(200).json({message:"No books to show"})
        }
        res.status(200).json({allbooks})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})    


//post books
Router.post('/postbook',protectedRoutes, async (req, res) => {
    try {
        const {bookName,category,author} = req.body
        if (!bookName|| !category || !author) {
            return res.status(400).json({ error: "All fields are required" })
        }
        const newBook = await Library.create({bookName,category,author})
        res.status(200).json({ message: "Book added" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Please authorize first" })
    }
})



//eventBooking
Router.post('/issuebook/:id',protectedRoutes,async(req,res)=>{
    try {
        const{issueddate,duedate}=req.body
        if(!issueddate||!duedate){
            return res.status(400).json({error:"All fields are required"})
        }
        const {id:bookid}=req.params;
        // console.log(bookid)
        const bookdata=await Library.findOne({_id:bookid})
        if(!bookdata){
            return res.status(404).json({error:"Book doesnt exist"})
        }
        const alreadyIssued=await LibraryBookings.findOne({user:req.user._id,bookid})
        if(alreadyIssued){
            return res.status(400).json({error:"You have already issued it"})
        }
        // console.log(eventdata)
        const newbooking= await LibraryBookings.create({
            user:req.user._id,
            username:req.user.name,
            bookid,
            bookname:bookdata.bookName,
            issueddate,
            duedate,
        })    
        await newbooking.save()
        res.status(200).json({message:"Book Issued"})
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }    
})    



//getissuedbooks
Router.get('/getuserbooks',protectedRoutes,async(req,res)=>{
    try {
        // const{user,eventid}=req.body
        // console.log(req.user._id)
        const userbooking=await LibraryBookings.find({user:req.user._id}).select('-_id -user -username');
        if(!userbooking||userbooking.length===0){
           return res.status(200).json({message:"No books to display"})
        }    
        res.status(200).json(userbooking)
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }    
})            



module.exports = Router