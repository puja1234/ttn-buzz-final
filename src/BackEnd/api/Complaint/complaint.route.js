var complainController = require('./complaint.controller.js')

module.exports = (app) => {
    app.post('/compalain',complainController.createComplain); //create new complain
    app.get('/complain',complainController.getComplain); //get all complains
    app.get('/complain',complainController.getSpecificComplain); // get complain on the basis of type
    // app.get('/comlain',complainController.)
}