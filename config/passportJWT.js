const passport = require('passport')
const Candidate = require('../model/candidate')
const passportJWT = require('passport-jwt').Strategy
const ExtractJWT = require('passport-jwt').ExtractJwt

passport.use( new passportJWT(   
    {
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken,
        secretOrKey: 'test'
    }, async function (payload, done) {

        try {

            const user = await Candidate.findOne({ email: payload })
            if(user) { done(null, user) }
            else {
                done(null, false)
            }

        }catch(error) {
            done(error, false)
        }
        


    }
  ) )

  module.exports = passport