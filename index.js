const express = require('express')
const path = require('path')
const db = require('./config/mongoose')
const Candidate = require('./model/candidate')
const PORT = 8000
const app = express()

// middlewares
let counter = 0;
app.use(express.urlencoded())
app.use(express.json())

app.use ((req, res, next) => {

    counter++;
    console.log("request number:- ",counter)
    next()

})

app.get('/', (req, res) => {

    return res.sendFile(path.join(__dirname, './index.html'))

})

app.get('/home', (req, res) => {

    console.log(req.query)

    return res.send('<h1> Served by expressJS! </h1>')

})

app.get('/about/:id', (req, res) => {

    console.log(req.params)

    return res.status(200).json({
        name: 'CN',
        roll: 100,
        id: req.params.id
    })

})


app.get('/student', async (req, res) => {

    const students = await Candidate.find({})

    return res.status(200).json({
        message: "Students fetched successfully!",
        data: students
    })

})

app.post('/student', async (req, res) => {

    console.log(req.body)

    const student = await Candidate.create(req.body)

    return res.status(200).json({
        message: "Student successfully created!",
        data: student
    })
    
})

app.put('/student/:id', async (req, res) => {

    console.log(req.body)
    console.log(req.params)

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


app.listen(PORT, () => {
    console.log("Server is running!")
})
