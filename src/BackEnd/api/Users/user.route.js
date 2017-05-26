let user_controller = require('./user.controller');

module.exports = ( app,isAuthenticated ) => {   //get user from users collection
    app.get('/api/User',isAuthenticated,user_controller.getSpecificUser);
};