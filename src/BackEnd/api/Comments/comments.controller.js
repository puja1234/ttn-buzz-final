'use strict';
var commentService = require('./comments.service');

// Creates a new comment in the DB.
exports.create = (req, res)=> {
    let commentData = req.body.commentPost;
    commentService.create(commentData,res);
};

exports.getComments = (req,res) => {
    commentService.getComments(res);
}

exports.deleteComment = (req,res) => {
    let id = req.body.postId;
    commentService.deleteComment(id,res);
}

