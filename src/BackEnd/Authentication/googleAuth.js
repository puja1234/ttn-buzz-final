let passport = require('passport');
let GoogleStartergy = require('passport-google-oauth').OAuth2Strategy;
var User = require('../api/Users/user.model');
const user_service = require('../api/Users/user.service');
var mailerDemo = require('../mailer');

exports.googleConst = () => {
    passport.use(new GoogleStartergy({
        'clientID':'619164609151-n3gsfbm615jhrtmjlcoq5bj2k4ao1u9r.apps.googleusercontent.com',
        'clientSecret':'5rYJtIY3frqSo8OFC_Wul7ib',
        'callbackURL':'http://localhost:3000/auth/google/callback'
        },
        (request,accessToken,refreshToken,profile,done)=> {
            if (profile._json.domain === 'tothenew.com') {
                console.log(profile);
                 User.findOne({'email':profile.emails[0].value},
                    function(err, user) {
                        if (err) { return done(err); } //if error
                        if (user) { return done(null, user); } //if user exists
                        else{
                            console.log("create new user");
                            var newUser = new User();
                            setUser(newUser,profile);
                            user_service.createUser(newUser, (err, _user) =>{
                                if(err) {
                                    return done(null);
                                }else{
                                    mailerDemo.send(profile.emails[0].value);
                                    return done(null,newUser);
                                }
                            });
                        }
                    });
            }
            else{
                return done(null);
            }
        })
    )
}

passport.serializeUser((user,done)=>{
    done(null,user._id);
})

passport.deserializeUser((userID,done)=>{
    User.findById(userID, function(err, user) {
        done(err, user);
})})

const setUser = (newUser,profile) => {
    newUser.name = profile.displayName;
    newUser.email = profile.emails[0].value;
    newUser.imageURL = profile.photos[0].value;
    newUser.createdAt = new Date();
    newUser.updatedAt = new Date();
    newUser.googleId = profile.id;
}

