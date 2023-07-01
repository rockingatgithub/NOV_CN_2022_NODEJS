const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/interview_dashboard')

const db = mongoose.connection

db.on('open', () => {
    console.log("MongoDB connected successfully!")
})

module.exports = db