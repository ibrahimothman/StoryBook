const User = require("../models/User")
const GoogleStrategy = require('passport-google-oauth20').Strategy;

module.exports = (passport) => {
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_AUTH_CALLBACK_URI
    },
    async (accessToken, refreshToken, profile, done) =>  {
        let newUser = {
            googleID: profile.id,
            displayName: profile.displayName,
            firstName: profile.name.givenName,
            lastName: profile.name.familyName,
            image: profile.photos[0].value,
        }
        try{
            let user = await User.findOne({googleID: profile.id});
            if(!user){
                user = await User.create(newUser)
            }
            done(null, user)
        }catch(err){
            console.error(err);
        }
    
    }
    ));

    passport.serializeUser((user, done) => done(null, user.id));
    
    passport.deserializeUser((id, done) => 
        User.findById(id, (err, user) => done(err, user)));   
}     

