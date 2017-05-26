const expressSession = require('express-session');
const passport = require('passport');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const GoogleStratergy = require('./Authentication/googleAuth');
const user_routes = require('./api/Users/user.route');
const buzz_routes = require('./api/Buzz/buzz.route');
const comment_routes = require('./api/Comments/comments.route');
let complaint_controller = require('./api/Complaint/complaint.controller');
let comment_controller = require('./api/Comments/comments.controller.js');

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
             res.status(401).redirect('/');
         }
     };

    user_routes(app,isAuthenticated);
    buzz_routes(app,isAuthenticated);
    comment_routes(app,isAuthenticated);
    app.post('/api/complaint',complaint_controller.createComplaint);
    app.get('/api/complaint',complaint_controller.getComplaint);
    app.put('/api/changeStatus',complaint_controller.changeStatus);
    app.get('/api/myComplaint',complaint_controller.getUserSpecificComplaint);
    app.delete('/api/deleteComplaint',complaint_controller.deleteComplaint);

    app.get("/api/logout",isAuthenticated,function (req,res) {
        req.session.destroy(function() {
            //req.logout();
            res.clearCookie('userId');
            res.clearCookie('connect.sid');
            res.redirect('/');
        });
    });


    app.get('/*', function (req, res) {
        res.sendfile('./src/index.html')
    })
}