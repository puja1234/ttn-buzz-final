let User = require('./user.model.js');

exports.createUser = ( userData,callback ) => {

    //create user
    User.create(userData,(err,data) => {
        if(err){
            return callback(err);
        }
        else{
            return callback(null, data);
        }
    })
};

