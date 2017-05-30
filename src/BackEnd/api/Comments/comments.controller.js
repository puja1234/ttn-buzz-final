'use strict';
var commentService = require('./comments.service');

// Creates a new comment in the DB.
exports.create = (req, res)=> {
    let commentData = req.body.commentPost;
    commentService.create(commentData,res);
};

//getting comments
exports.getComments = (req,res) => {
    commentService.getComments(res);
};

//delete comments
exports.deleteComment = (req,res) => {
    let id = req.body.postId;
    commentService.deleteComment(id,res);
};


