const express = require('express')
const Candidate = require('../../model/candidate')
const router = express.Router()

router.post('/', async (req, res) => {

    try {

        let user = await Candidate.findOne({ email: req.body.email, password: req.body.password })

        if (user) {

            res.cookie('user', user.email)

            return res.status(200).json({
                message: 'User successfully loggedin!',
                user,
                role: 'candidate'
            })
        }

        return res.status(401).json({
            message: 'Email/password is unmatched!'
        })

    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Internal server error!"
        })
    }


})

module.exports = router