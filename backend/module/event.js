const mongoose=require('mongoose')

const event=mongoose.Schema({
    eventocassion:{
        type:String,
        require:true,
    },
    eventname:{
        type:String,
        require:true,
        unique:true
    },
    eventcategory:{
        type:String,
        require:true
    },
    eventdescription:{
        type:String,
        require:true
    },
    eventvenue:{
        type:String,
        require:true,
    },
    eventday:{
        type:String,
        require:true
    },
    eventtimmings:{
        type:String,
        require:true
    },
    eventimg:{
        type:String,
        require:true
    }
})

const Event=new mongoose.model('Event',event)

module.exports=Event