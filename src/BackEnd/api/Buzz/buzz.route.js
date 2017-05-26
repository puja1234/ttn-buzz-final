const multer =	require('multer');

const upload = multer({dest:'files/'});
const buzz_controller = require('./buzz.controller');

module.exports = ( app,isAuthenticated ) => {
    app.get('/api/Buzz',isAuthenticated,(req,res,next)=>{console.log("user in buzz",req.user);next()},buzz_controller.getPost);
    app.get('/api/UserSpecifcPost',isAuthenticated,buzz_controller.getSpecificPost);

    app.post('/api/Buzz',isAuthenticated,upload.single('image'),buzz_controller.createPost);

    app.put('/api/likeDislike',isAuthenticated,buzz_controller.updateLikes);

    app.delete('/api/deletePost',isAuthenticated,buzz_controller.deletePost);

};