const express = require('express')
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const db = require('./config/mongoose')
// const passport = require('./config/passportLocalStrategy')
const passportJWT = require('./config/passportJWT')
const PORT = 8000
const app = express()


app.use( (req, res, next) => {
    console.log(req.headers)
    next()
}  )

// middlewares
app.use(cors())
app.use(cookieParser())
app.use(express.urlencoded())
app.use(express.json())
// app.use(require('express-session')({ secret: 'keyboard cat', resave: true, saveUninitialized: true }));
// app.use(passport.initialize())
// app.use(passport.session())
app.use(passportJWT.initialize())

app.use('/', require('./routes'))

app.listen(PORT, () => {
    console.log("Server is running!")
})
