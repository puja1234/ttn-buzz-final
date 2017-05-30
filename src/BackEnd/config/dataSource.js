let mongoose = require('mongoose');

module.exports = conn = mongoose.connect('mongodb://localhost/BuzzApp');

    mongoose.connection.on('open',function (err,data) {
        console.log('connection successful');
    });
    mongoose.connection.on('error',function (err,data) {
        console.log('could not connect',err);
    });



