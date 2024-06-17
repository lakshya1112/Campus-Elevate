const express = require('express')
const UserResources = require('../../module/userResources.js')
const BorrowedResource = require('../../module/resourceBorrower.js')
const protectedRoutes=require('../../middleware/protectedRoutes.js')
const Router = express.Router()


//post resources
Router.post("/postresources",protectedRoutes, async (req, res) => {
    try {
        const { Resourcename, ResourceCategory, resourceImage, resourceDescription } = req.body
        if (!Resourcename || !ResourceCategory || !resourceDescription) {
            return res.status(400).json({ error: "All firelds are required" })
        }
        const newResource = await UserResources.create({ Resourcename, ResourceCategory ,resourceDescription })
        await newResource.save()
        res.status(200).json({ message: "Resources added" })
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Internal server error" })
    }
})

//getresources
Router.get("/getResources", async (req, res) => {
    try {
        // const {Resourcename,ResourceCategory,resourceImage,resourceDescription}=req.body
        // const Resources=UserResources.find({$all})

        const allUsers = await UserResources.find()
        if(!allUsers||allUsers.length===0){
            return res.status(200).json({message:"No resources to show"})
        }
        res.status(200).json({ allUsers })

    } catch (error) {
        res.status(500).json({ error: "Internal Server error" })
        console.log(error)
    }
})

Router.post('/borrowresources',protectedRoutes,async(req,res)=>{
    try {
        const {borrower,resource}=req.body
        const newborrower=await BorrowedResource.create({borrower:req.user._id,resource})
        await newborrower.save()
        res.status(200).json({message:"Borrowed"})
    } catch (error) {
        res.status(500).json({ error: "Login first" })
        console.log(error)
    }
})

Router.get('/borrowedresources',protectedRoutes,async(req,res)=>{
    try {
        const borrowed=await BorrowedResource.find()
        console.log(borrowed)
        if(!borrowed||borrowed.length===0){
           return res.status(200).json({message:"No resources to display"})
        }
        res.status(200).json({borrowed})
    } catch (error) {
        res.status(500).json({ error: "Login first" })
        console.log(error)
    }
})



module.exports=Router