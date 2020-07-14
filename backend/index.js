const express = require('express')
const app = express()
const path = require('path')
const PORT = process.env.PORT||3000
const mongoose = require('mongoose')

mongoose.set('useCreateIndex', true)
mongoose.connect('mongodb://localhost/project',{useNewUrlParser: true})
        .then(() => {
            console.log("Mongodb connected")
        })
        .catch(() => {
            console.log("error")
        })
require('./models/User')
require('./models/Article')
require('./models/Comment')

app.use(express.static(path.join(__dirname, "public")))
app.use('/public' , express.static(path.join(__dirname, "public")))
app.use(require('./routes'))
app.use((err, req, res, next)=> {
    res.status(err.status||500)
    res.json({'errors':{
        message: err.message,
        error: {}
    }})
})
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}...`)
})