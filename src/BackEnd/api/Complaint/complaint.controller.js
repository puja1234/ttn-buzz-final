let complaintService = require('./complaint.service');

exports.createComplaint =(req,res) => { //create new post in db
    let complaintData = req.body;
    console.log("Creating complaint in  complaint controller",complaintData);
    complaintService.createComplaint(complaintData,res);
};

exports.getComplaint = (req,res) => {
    let email = req.user.email;
    console.log("email in complaint controller received is ",email);
    complaintService.getComplaints(email,res);
};

exports.changeStatus = (req,res) => {
    let statusData = req.body.statusData;
    complaintService.changeStatus(statusData, res);
};

exports.getUserSpecificComplaint = (req,res) => {
    console.log(req.user.email,'-------------in controller-----------');
    complaintService.getUserSpecificComplaint(req.user.email,res);
};

exports.deleteComplaint = (req,res) => {
    console.log("*********************************************");
    let id = req.body;
    console.log("in controller of delete id to be deleted is",id);
    complaintService.deleteComplaint(id.complaintid,res);
};