'use strict'
var mongoose = require('mongoose')

var ComplaintSchema = new mongoose.Schema({
    complaint_type:String,
    content:String,
    createdAt:Date,
    updatedAt:Date,
    status:{
        type:String,
        default:'pending'
    },
    complaint_by:String,
    assignee_email:String
})

module.exports = mongoose.model('Complaint',ComplaintSchema);