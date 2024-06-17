const express=require('express')
const bcryptjs=require('bcryptjs')
const User=require('../../module/userSchema.js')
const jwt=require('jsonwebtoken')

const router=express.Router()


//sinup
router.post('/signup',async(req,res)=>{
    try{
        const{name,regno,password}=req.body
        console.log(name)
        if(!name||!regno||!password||name===''||regno===''||password===''){
            return res.status(400).json({error:"All fields are required"})
        }
        if(regno.length!==10){
            return res.status(400).json({error:"Reg no should be 10 digit"})
        }
        const userCheck=await User.findOne({regno})
        if(userCheck){
            return res.status(404).json({error:'User already exist'})
        }
    
        // bcryptjs
        const hashPassword=bcryptjs.hashSync(password,10)
        
        const newUser=await User.create({name,regno,password:hashPassword})
        const data={
            user:{_id:newUser._id}
        }
        console.log("Token Data:", data)
    
        const auth=await jwt.sign(data,"harsh")
        await newUser.save()
        res.status(201).json({message:"User Created",auth})
    }catch(error){
        res.status(404).json({error:'Internal Server error'})
        console.log(error)
    }
})

//login
router.post('/signin',async(req,res)=>{
    try{
        const {regno,password}=req.body;
        if(!regno||!password){
            return res.status(400).json({error:"All fields are required"})
        }
        const userCheck=await User.findOne({regno})
        if(!userCheck){
            return res.status(404).json({error:"User not found"})
        }
        const checkPassword=await bcryptjs.compareSync(password,userCheck.password)
        if(!checkPassword){
            return res.status(400).json({error:'User name or Password not defined'})
        }
        const data={
            user:{_id:userCheck._id}
        }
        console.log("Token Data:", data)
    
        const auth=await jwt.sign(data,"harsh")
        res.status(200).json({message:"Login successfull",auth})
    }catch(error){
        res.status(404).json({error:'Internal Server error'})
        console.log(error)
    }
})


module.exports=router