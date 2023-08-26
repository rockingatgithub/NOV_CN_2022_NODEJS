const mongoose = require('mongoose')

const interviewSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    lastDate: {
        type: Date,
    },
    package: {
        type: Number,
        required: true,
    },
    candidates: [{
        type: mongoose.Types.ObjectId,
        ref: 'Candidate'
    }]

})

const Interview = mongoose.model('Company', interviewSchema)
module.exports = Interview