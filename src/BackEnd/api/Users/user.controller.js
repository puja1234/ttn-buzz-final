var userService = require('./user.service.js');


exports.getUser = (req,res,next) => { //get specific user on the basis of id
    var userId = req.param.id;
    console.log('inside user controller getUser');
    userService.getUser(userId,res);
}

exports.getSpecificUser = (req,res,next) => {
    console.log("user session maintain",req.user);
    res.send(req.user);

}