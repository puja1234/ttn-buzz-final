'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new Schema({
    created_at: {
        type: Number,
        default: Date.now
    },
    updated_at: {
        type: Number,
        default: Date.now
    },
    content : String,
    postId : String,
    userEmail:String,
    user_Profile:String
});

module.exports = mongoose.model('Comment', CommentSchema);
