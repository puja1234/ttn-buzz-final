let complaint_controller = require('./complaint.controller.js');

module.exports = (app,isAuthenticated) => {
    app.post('/api/Complaint',isAuthenticated,complaint_controller.createComplaint);
    app.get('/api/Complaint',isAuthenticated,complaint_controller.getComplaint);
    app.delete('/api/Complaint',isAuthenticated,complaint_controller.deleteComplaint);
    app.put('/api/Complaint',isAuthenticated,complaint_controller.changeStatus);

    app.get('/api/myComplaint',isAuthenticated,complaint_controller.getUserSpecificComplaint);
};

