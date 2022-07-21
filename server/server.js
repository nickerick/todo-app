require('dotenv').config()

const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

mongoose.connect("mongodb+srv://admin:adminpassword@cluster0.3qgmkro.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Conntected to Database'))

app.use(express.json())
app.use(cors())

const subscribersRouter = require('./routes/router')
app.use('/users', subscribersRouter)

app.listen(process.env.PORT || 4200, () => console.log('Server Started')) 