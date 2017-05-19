'use strict';

var mongoose = require('mongoose');

var categoryTypes = ['Lost and Found','Activity']

var BuzzSchema = new mongoose.Schema({
    category:{
        type:String,
        enum:categoryTypes
    },
    created_at: {
        type: Number,
        default: Date.now
    },
    updated_at: {
        type: Number,
        default: Date.now
    },
    content :{
        type:String
    },
    user_email:{
        type:String
    },
    user_imageURL:{
        type:String
    },
    imageUpload:{
        type:String
    },
    likes:[],
    dislike:[]
    },
    { versionKey:false,

}
    );

module.exports = mongoose.model('Post',BuzzSchema)