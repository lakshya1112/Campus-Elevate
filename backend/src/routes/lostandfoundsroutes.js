
const express = require('express');
const LostItem = require('../../module/LostItem.js');
const FoundItem = require('../../module/FoundItem.js');
// const protectedRoutes=require('../../middleware/protectedRoutes.js');
const protectRoute = require('../../middleware/protectedRoutes.js');

const router = express.Router();




// Get all found items
router.get('/founded',protectRoute, async (req, res) => {
  try {
    const foundItems = await FoundItem.find();
    if(!foundItems||foundItems.length===0){
      return res.status(202).json({message:"No items to display"})
    }
    res.status(200).json({foundItems});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error:"Internal server error" });
  }
});

// Create a new found item
router.post('/newfound',protectRoute,async (req, res) => {
  try {
    const {title,description,image,date,place,ownerName}=req.body
    console.log(title,description,image,date,place,ownerName)
    if(!title||!description||!ownerName){
      return res.status(400).json({error:"tile description ownername required"})
    }
    const foundItem = await FoundItem.create({title,description,image,date,place,ownerName});
    await foundItem.save()
    res.status(200).json({message:"Data saved"})
  } catch (error) {
    console.log(error)
    res.status(400).json({error:"Login first"})
  }
});





// Get all lost items
router.get('/losted',protectRoute ,async (req, res) => {
  try {
    const lostItems = await LostItem.find();
    if(!lostItems||lostItems.length===0){
      return res.status(202).json({message:"No items to display"})
    }
    res.status(200).json({lostItems});
  } catch (err) {
    console.log(err)
    res.status(500).json({ error:"Internal server error" });
  }
});

// Create a new lost item
router.post('/newlost', protectRoute, async (req, res) => {
  const {title,description,image,date,place,ownerName}=req.body
  console.log(title,description,image,date,place,ownerName)
  if(!title||!description||!ownerName){
    return res.status(400).json({error:"tile description ownername id reuired"})
  }
  const lostItem = await LostItem.create({title,description,image,date,place,ownerName});
  await lostItem.save()
  res.status(200).json({message:"Data saved"})
});



module.exports = router;