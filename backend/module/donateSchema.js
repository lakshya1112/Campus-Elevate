const mongoose = require('mongoose')

const donate = mongoose.Schema({
    name: { type: String, required: true },
    designation: { type: String, required: true },
    amt: { type: String, required: true }
})
const Donate = mongoose.model('Donate', donate)
module.exports = Donate