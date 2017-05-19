'use strict'
var mongoose = require('mongoose')
Schema = mongoose.Schema;

var ComplaintSchema = Schema({
    type:String,
    content:String,
    createdAt:Date,
    updatedAt:Date,
    status:{
        type:String,
        default:'pending'
    },
    user:{
        userId:String,
        name:String
    },
    assignee:{
        userId:String,
        name:String
    }
})

model.exports = mongoose.model('Complaint',ComplaintSchema);