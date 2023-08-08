const passport = require('passport')
const Candidate = require('../model/candidate')
const passportLocal = require('passport-local').Strategy


passport.use( new passportLocal(  {
    usernameField: 'email',
}, async function (email, password, done) {

    try{

        const candidate = await Candidate.findOne( { email, password } )

        if(candidate) {
            done(null, candidate)
        } else {
            done(null, false)
        }

    }catch(error) {
        done( error, false )
    }


}   ) )


passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async function(id, done) {
    
    try {

        const candidate = await Candidate.findById(id)

        if(candidate) {
            done(null, candidate)
        } else {
            done(null, false)
        }

    } catch(error) {
        done(error, false)
    }
  });


  module.exports = passport