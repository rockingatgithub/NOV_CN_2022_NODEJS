const express = require('express')
const jwt = require('jsonwebtoken')
const Candidate = require('../../model/candidate')
const router = express.Router()
// const passport = require('./../../config/passportLocalStrategy')
const passportJWT = require('./../../config/passportJWT')

router.post('/' ,async (req, res) => {

    try {


        let user = await Candidate.findOne({ email: req.body.email, password: req.body.password })

        if (user) {

            const token = jwt.sign(user.email, 'test')

            return res.status(200).json({
                message: 'User successfully loggedin!',
                user: req.user,
                role: 'candidate',
                token
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