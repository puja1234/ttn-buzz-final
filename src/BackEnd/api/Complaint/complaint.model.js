'use strict';
let mongoose = require('mongoose');

let ComplaintSchema = new mongoose.Schema({
    complaint_type:String,
    content:String,
    createdAt:Date,
    updatedAt:Date,
    status:{
        type:String,
        default:'pending'
    },
    complaint_by:{
        type:String,
        index:true
    },
    assignee_email:{
        type:String,
        index:true
    }
});

module.exports = mongoose.model('Complaint',ComplaintSchema);