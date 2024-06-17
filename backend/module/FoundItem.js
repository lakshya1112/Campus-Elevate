
const mongoose = require('mongoose');

const foundItemSchema = new mongoose.Schema({
  title: {type:String},
  description:{type:String},
  image: {type:String},
  date:{type:Date},
  place:{type:String},
  OwnerName: {type:String}
});

module.exports = mongoose.model('FoundItem', foundItemSchema);
