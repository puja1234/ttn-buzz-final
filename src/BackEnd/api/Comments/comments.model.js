'use strict';

const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

const CommentSchema = new Schema({
    created_at: {
        type: Number,
        default: Date.now
    },
    updated_at: {
        type: Number,
        default: Date.now
    },
    content : String,
    postId : {
        type:String,
        index:true
    },
    userEmail:{
        type:String,
        index:true
    },
    user_Profile:String
});

module.exports = mongoose.model('Comment', CommentSchema);
