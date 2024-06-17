
const express = require('express');
const router = express.Router();
const FoundItem = require('../models/FoundItem');




// Get all found items
router.get('/', async (req, res) => {
  try {
    const foundItems = await FoundItem.find();
    res.json(foundItems);
  } catch (err) {
    res.status(500).json({ error:"Internal Server error" });
  }
});

// Create a new found item
router.post('/', async (req, res) => {
  const foundItem = new FoundItem({
    title: req.body.title,
    description: req.body.description,
    image: req.image,
    date: req.body.date,
    place: req.body.place,
    finderName: req.body.finderName
  });

  try {
    const newFoundItem = await foundItem.save();
    res.status(201).json(newFoundItem);
  } catch (err) {
    res.status(400).json({ error:"internal server error" });
  }
});

module.exports = router;
