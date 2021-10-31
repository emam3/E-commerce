require('dotenv').config()
require('../db/connection')
const express = require('express')
const app = express()


app.use(express.json())
// app.use(express.urlencoded({extends:true})) 

const userRoutes = require('../routes/user.routes')
const broductRoutes = require('../routes/broduct.routes')
app.use("/user",userRoutes)
app.use("/broduct",broductRoutes)

module.exports = app