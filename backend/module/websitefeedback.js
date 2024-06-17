const mongoose = require('mongoose')

const websitefeedback = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    }
})

const WebsiteFeedback=mongoose.model('WebsiteFeedback',websitefeedback)
module.exports=WebsiteFeedback