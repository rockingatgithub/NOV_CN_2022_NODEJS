const Candidate = require("../model/candidate")

exports.authMiddleware1 = async (req, res, next) => {

    console.log("cookies", req.cookies)

    if (req.cookies.user) {

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