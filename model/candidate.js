const mongoose = require('mongoose')

const candidateSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

const Candidate = mongoose.model('Student', candidateSchema)

module.exports = Candidate