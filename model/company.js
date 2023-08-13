const mongoose = require('mongoose')

const companiesSchema = new mongoose.Schema({

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

const Company = mongoose.model('Company', companiesSchema)
module.exports = Company