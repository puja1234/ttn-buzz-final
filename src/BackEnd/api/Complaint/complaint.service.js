let Complaint = require('./complaint.model');
exports.createComplaint = (complaintData, res) => {

    Complaint.create(complaintData, (err, data) => {
        if (err) {
            res.send("error occured in creating complaint");
        }

        if (data) {
            res.send(data);
        }
    })

};

exports.getComplaints = (email,res) => {
    Complaint.find({assignee_email:email} , (err,data) => {
        if(err)
            res.send("error occurred in getting complaints");
        else
            res.send(data);
    })
};

exports.changeStatus = (statusData,res) => {

    if(statusData.status === 'close'){
        Complaint.find({_id: statusData.id}, (err, data) => {
            if (err)
                res.send(err);
            else {
                Complaint.remove({_id: statusData.id}, (err, dataRemoved) => {
                    if (err)
                        res.send(err);
                    else{
                        res.send(data);
                    }

                })
            }
        });
    }else{
       console.log("status in service is resolving");
        Complaint.update({_id:statusData.id},{$set:{status:'resolve'}},(err,data) => {
            if(err)
                res.send(err);
            else {
                console.log("status is updated",data);
                Complaint.find({_id: statusData.id}, (err, data) => {
                    console.log("document updated is", data);
                    res.send(data);
                })
            }
       })
     }
};

exports.getUserSpecificComplaint =(email,res) => {
    Complaint.find({complaint_by:email} , (err,data) => {
        if(err)
            res.send("error occurred in getting complaints");
        else
            res.send(data);
    })
}