const multer =	require('multer');

const upload = multer({dest:'files/'});
const buzz_controller = require('./buzz.controller');

module.exports = ( app,isAuthenticated ) => {
    app.get('/api/Buzz',isAuthenticated,buzz_controller.getPost);
    app.post('/api/Buzz',isAuthenticated,upload.array('image',3),buzz_controller.createPost);
    app.put('/api/Buzz',isAuthenticated,buzz_controller.updateLikes);
    app.delete('/api/Buzz',isAuthenticated,buzz_controller.deletePost);

    app.get('/api/UserSpecifcPost',isAuthenticated,buzz_controller.getSpecificPost);
    app.get('/api/BuzzCategory',isAuthenticated,buzz_controller.getCategoryBuzz);
};