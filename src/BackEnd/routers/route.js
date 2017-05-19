const expressSession = require('express-session')
const passport = require('passport');
const express = require('express')
const path = require('path');
const bodyParser = require('body-parser');
const multer	=	require('multer');

const GoogleStratergy = require('./../Authentication/googleAuth');
let upload = multer({dest:'files/'});
let buzz_controller = require('./../api/Buzz/buzz.controller.js');
let user_controller = require('./../api/Users/user.controller.js');
let comment_controller = require('./../api/Comments/comments.controller');

module.exports = (app) => {

    app.use(
        expressSession({secret:'123456789'}),
        passport.initialize(),
        passport.session());

    GoogleStratergy.googleConst();

    app.use(bodyParser());



    app.get("/api/login",passport.authenticate('google',{scope:["profile","email"]}));

    app.get("/auth/google/callback",passport.authenticate('google',{
        successRedirect:"http://localhost:3000/home",
        failureRedirect:"http://localhost:3000/"
    }));

     isAuthenticated = (req,res,next) => {
         if(req.user){
             console.log('authenticated user session');
             next();
         }
         else{
             console.log('user session not valid->');
             res.status(401).send("Could not find this page");
         }
     }

    app.get('/User',isAuthenticated,user_controller.getSpecificUser);
    app.get('/Buzz',isAuthenticated,(req,res,next)=>{console.log("user in buzz",req.user);next()},buzz_controller.getPost);
    app.get('/api/UserSpecifcPost',isAuthenticated,buzz_controller.getSpecificPost);
    app.get('/api/getComments',isAuthenticated,comment_controller.getComments);
    app.get("/api/logout",isAuthenticated,function (req,res) {
        req.session.destroy(function() {
            req.logout();
            res.clearCookie('userId');
            res.redirect('/');
        });
    });

    app.post('/Buzz',isAuthenticated,upload.single('image'),buzz_controller.createPost);

    app.put('/api/likeDislike',isAuthenticated,buzz_controller.updateLikes);
    app.put('/api/comment',isAuthenticated,comment_controller.create);

    app.delete('/api/deletePost',isAuthenticated,buzz_controller.deletePost);
    app.delete('/api/deleteComment',isAuthenticated,comment_controller.deleteComment);

    loggedIn = (req, res, next) => {
        if (req.url == "/") {
            if (req.user) {
                res.redirect("/home")
            }
            next();
        } else if (req.user) {
            next()
        } else {
            res.redirect("/")
        }
    }
    app.get('/*',loggedIn, function (req, res) {
        res.sendfile('./src/index.html')
    })
}