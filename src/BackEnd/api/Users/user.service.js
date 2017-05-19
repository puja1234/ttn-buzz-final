var User = require('./user.model.js');

exports.createUser = ( userData,callback ) => {
   console.log("inside service",userData);
    User.create(userData,(err,data) => {  //create user
        if(err){
            return callback(err);
        }
        else{
            return callback(null, data);
        }
    })
}

