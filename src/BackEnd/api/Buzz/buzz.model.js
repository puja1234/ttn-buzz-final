'use strict';

const mongoose = require('mongoose');

let categoryTypes = ['Lost and Found','Activity'];

let BuzzSchema = new mongoose.Schema({
    category:{
        type:String,
        enum:categoryTypes,
        index:true
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
        type:String,
        index:true
    },
    user_imageURL:{
        type:String
    },
    imageUpload:[],
    likes:[],
    dislike:[]
    },
    { versionKey:false,

}
    );

module.exports = mongoose.model('Post',BuzzSchema)