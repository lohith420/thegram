const express = require('express')
//invoking
const app = express()
const mongoose = require('mongoose')
const PORT = 5000
const {MONGOURI} = require('./keys')




//connect DB
mongoose.connect(MONGOURI)

mongoose.connection.on('connected', () =>{
    console.log("connected to mongo sucessfully")
})
mongoose.connection.on('error', (err) =>{
    console.log("err in connecting", err)
})


//register userSchema here
require('./models/user')
require('./models/post')

//parcing incoming request
app.use(express.json())

//adding routers
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))


app.listen(PORT, () => {
    console.log("server is running on", PORT)
})


