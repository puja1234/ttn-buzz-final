let complaintService = require('./complaint.service');

exports.createComplaint =(req,res) => { //create new post in db
    let complaintData = req.body;
    console.log("Creating complaint in  complaint controller",complaintData);
    complaintService.createComplaint(complaintData,res);
};

exports.getComplaint = (req,res) => {
    let email = req.param('email');
    console.log("email in complaint controller received is ",email);
    complaintService.getComplaints(email,res);
};

exports.changeStatus = (req,res) => {
    let statusData = req.body.statusData;
    console.log('______________________________ in complaint controller',statusData);
    complaintService.changeStatus(statusData,res);
};

exports.getUserSpecificComplaint = (req,res) => {
    let email = req.param('email');
    console.log(req.user,'-------------in controller-----------');
    complaintService.getUserSpecificComplaint(email,res);
}


