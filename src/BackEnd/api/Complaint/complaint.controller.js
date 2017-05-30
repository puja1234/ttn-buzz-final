let complaintService = require('./complaint.service');

//create new post in db
exports.createComplaint =(req,res) => {
    let complaintData = req.body;
    complaintService.createComplaint(complaintData,res);
};

//get admin assigned complaints
exports.getComplaint = (req,res) => {
    let email = req.user.email;
    complaintService.getComplaints(email,res);
};

//change complaint status
exports.changeStatus = (req,res) => {
    let statusData = req.body.statusData;
    complaintService.changeStatus(statusData, res);
};

//get my complaints
exports.getUserSpecificComplaint = (req,res) => {
    complaintService.getUserSpecificComplaint(req.user.email,res);
};

//delete complaints
exports.deleteComplaint = (req,res) => {
    let id = req.body;
    complaintService.deleteComplaint(id.complaintid,res);
};