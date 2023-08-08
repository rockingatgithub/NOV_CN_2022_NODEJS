const express = require('express')
const passport = require('./../../config/passportJWT')
const middlware = require('../../middlewares/authMiddleware')
const router = express.Router()
const Candidate = require('../../model/candidate')


router.post('/', async (req, res) => {

    try{

        console.log(req.body)
        let student = await Candidate.findOne({ email: req.body.email })

        if(student) {
            return res.status(401).json({
                message: "Student already exist!",
                data: student
            })
        }

        student = await Candidate.create(req.body)
        return res.status(200).json({
            message: "Student successfully created!",
            data: student
        })

    }catch(error) {
        console.log(error)

        return res.status(500).json({
            message: "Internal server error"
        })
    }
    
})

router.get('/', passport.authenticate('jwt', {failureRedirect: '/create-session'}) ,async (req, res) => {

    console.log(req.user)

    const students = await Candidate.find({})

    return res.status(200).json({
        message: "Students fetched successfully!",
        data: students
    })

})

router.put('/:id', middlware.authMiddleware2 ,async (req, res) => {

    if(req.user.id !== req.params.id) {
        return res.status(401).json({
            messgae: "Unauthorized"
        })
    }

    let student = await Candidate.findById(req.params.id)

    if(student) {

        student = await Candidate.findByIdAndUpdate( req.params.id, req.body, { new: true })

        return res.status(200).json({
            message: "Student updated sucessfully!",
            student: student
        })

    } else {

        return res.status(401).json({
            message: "Student not found!"
        })

    }


})

module.exports = router