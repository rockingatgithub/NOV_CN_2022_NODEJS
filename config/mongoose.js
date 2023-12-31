const mongoose = require('mongoose')

const dbConnection = mongoose.connect(process.env.MONGODB_URL)

const db = mongoose.connection

db.on('open', () => {
    console.log("MongoDB connected successfully!")
})

module.exports = {db, dbConnection}