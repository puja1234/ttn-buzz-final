const comment_controller = require('./comments.controller');

module.exports = ( app,isAuthenticated ) => {
    app.get('/api/Comment',isAuthenticated,comment_controller.getComments);
    app.put('/api/Comment',isAuthenticated,comment_controller.create);
    app.delete('/api/Comment',isAuthenticated,comment_controller.deleteComment);
};
