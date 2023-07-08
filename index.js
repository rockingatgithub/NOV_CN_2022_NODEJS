const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const db = require('./config/mongoose')
const PORT = 8000
const app = express()

// middlewares
app.use(express.urlencoded())
app.use(express.json())
app.use(cookieParser())

app.use('/', require('./routes'))

app.listen(PORT, () => {
    console.log("Server is running!")
})
