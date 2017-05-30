let userService = require('./user.service.js');


exports.getUser = (req,res,next) => { //get specific user on the basis of id
    let userId = req.param.id;
    userService.getUser(userId,res);
};

exports.getSpecificUser = (req,res,next) => {
    res.send(req.user);
};