const mongoose = require('mongoose')

const conn = () => {
    mongoose.connect('mongodb://localhost:27017/Practice')
        .then(() => {
            console.log('connected to mongoDb')
        }).catch((error) => {
            console.log("unable to connect", error)
        })
}

module.exports = conn