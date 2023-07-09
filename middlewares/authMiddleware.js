const Candidate = require("../model/candidate")
const jwt = require('jsonwebtoken')

exports.authMiddleware1 = async (req, res, next) => {

    console.log("cookies", req.cookies)

    if (req.cookies.user) {

        // check for email in the cookie.
        const user = await Candidate.findOne( { email: req.cookies.user } )

        if(user) {
            // include user in the request object, so the user is available in the APIs
            req.user = user
            next()
        } else {
            return res.status(401).json({
                message: "Unauthorised!"
            })
        }

    } else {

        return res.status(401).json({
            message: "Unauthorised!"
        })

    }

}

exports.authMiddleware2 = async (req, res, next) => {

    try {

        console.log("cookies", req.cookies)

        if (req.cookies.user) {

            const data = jwt.verify(req.cookies.user, 'test')
            console.log(data)
    
            // check for email in the cookie.
            const user = await Candidate.findOne( { email: data } )
    
            if(user) {
                // include user in the request object, so the user is available in the APIs
                req.user = user
                next()
            } else {
                return res.status(401).json({
                    message: "Unauthorised!"
                })
            }
    
        } else {
    
            return res.status(401).json({
                message: "Unauthorised!"
            })
    
        }

    } catch(error) {

        return res.status(500).json({
            message: "Internal server error!"
        })

    }
   

    

}