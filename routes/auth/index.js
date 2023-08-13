const express = require('express')
const jwt = require('jsonwebtoken')
const Candidate = require('../../model/candidate')
const router = express.Router()
// const passport = require('./../../config/passportLocalStrategy')
const passportJWT = require('./../../config/passportJWT')

const GoogleOAuth = require('google-auth-library')
const generator = require('generate-password')

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

router.post('/google',  async (req, res) => {


    const client = new GoogleOAuth.OAuth2Client('416750331254-ppnm8ca2409p2hfqaglr222au3kc3f99.apps.googleusercontent.com')

    const ticket = await client.verifyIdToken({
        idToken: req.body.token,
        audience: '416750331254-ppnm8ca2409p2hfqaglr222au3kc3f99.apps.googleusercontent.com'
    })

    const {name, email} = ticket.getPayload()

    // store the user in our database....

    let candidate = await Candidate.findOne({ email: email })

    if(!candidate) {

        const password = generator.generate({
            length: 8,
            numbers: true
        })
        candidate = await Candidate.create({name, email, password})

    }

    return res.status(200).json({
        data: candidate
    })

})

module.exports = router