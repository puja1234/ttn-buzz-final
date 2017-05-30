let Complaint = require('./complaint.model');

//create Complaint
exports.createComplaint = (complaintData, res) => {
    Complaint.create(complaintData, (err, data) => {
        if (err) {
            res.send("error occured in creating complaint");
        }
        else{
            res.send(data);
        }
    })
};

//get admin specific complaints
exports.getComplaints = (email,res) => {
    Complaint.find({assignee_email:email} , (err,data) => {
        if(err)
            res.send("error occurred in getting complaints");
        else
            res.send(data);
    })
};

//admin change complaint status
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
        Complaint.update({_id:statusData.id},{$set:{status:'resolve'}},(err,data) => {
            if(err)
                res.send(err);
            else {
                Complaint.find({_id: statusData.id}, (err, data) => {
                  res.send(data);
                })
            }
       })
    }
};

//get my complaints
exports.getUserSpecificComplaint =(email,res) => {
    Complaint.find({complaint_by:email} , (err,data) => {
        if(err)
            res.send("error occurred in getting complaints");
        else
            res.send(data);
    })
};

//delete my complaints
exports.deleteComplaint = (id,res) => {
    Complaint.find({_id:id},(err,data)=>{
        if(err)
            res.send(err);
        else{
            Complaint.remove({_id:id},(err,removedData)=>{
                if(err)
                    res.send(err);
                else {
                    res.send(data);
                }
            })
        }
    });
};