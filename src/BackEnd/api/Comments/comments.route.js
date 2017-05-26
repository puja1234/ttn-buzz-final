const comment_controller = require('./comments.controller');

module.exports = ( app,isAuthenticated ) => {
    app.get('/api/getComments',isAuthenticated,comment_controller.getComments);
    app.put('/api/comment',isAuthenticated,comment_controller.create);
    app.delete('/api/deleteComment',isAuthenticated,comment_controller.deleteComment);
};
