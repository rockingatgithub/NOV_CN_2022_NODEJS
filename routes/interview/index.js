const express = require('express')
const Interview = require('../../model/interview')
const router = express.Router()

router.post('/create', async (req, res) => {

    try {

        const company = await Interview.create(req.body)

        return res.status(200).json({
            data: company,
            message: "Company successfully created!"
        })

    } catch(error) {
        return res.status(500).json({
            message: "Internal server error"
        })
    }

    

})

router.get('/get', async (req, res) => {

    try {
        
        const interviews = await Interview.find()
        return res.status(200).json({
            message: "Fetched all interviews!",
            data: interviews
        })

    } catch(error) {
        return res.status(500).json({
            message: "Error while fetching the interviews!"
        })
    }

})

module.exports = router