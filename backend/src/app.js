const express=require('express')
// const User=require('../module/userSchema.js')
const conn=require('../conn.js')
const cors=require('cors')
const path = require('path')

const userRoutes=require('./routes/userRoutes.js')
const resouresroutes=require('./routes/ResourcesRoutes.js')
const eventRoutes=require('./routes/eventsRoutes.js')
const feedbackRoutes=require('./routes/feedbackRoutes.js')
const websitefeedback=require('./routes/websitefeedbackRoutes.js')
const donateRoute=require('./routes/donateRoute.js')
const libraryRoutes=require('./routes/libraryRoutes.js')
const lostandfound=require('./routes/lostandfoundsroutes.js')

const app=express()

app.use(express.static(path.join(__dirname,'dist')))
app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'dist','index.html'))
})

app.use('/auth',userRoutes)
app.use('/user',resouresroutes)
app.use('/event',eventRoutes)
app.use('/feedback',feedbackRoutes)
app.use('/websitefeedback',websitefeedback)
app.use('/donate',donateRoute)
app.use('/library',libraryRoutes)
app.use('/lostandfound',lostandfound)

const port=3000
app.listen(port,()=>{
    conn()
    console.log('Listing to ',port)
})
