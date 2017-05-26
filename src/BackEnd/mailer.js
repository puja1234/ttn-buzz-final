var nodemailer = require('nodemailer');

function send(to) {
    // create reusable transporter object using the default SMTP transport
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'puja.goyal@tothenew.com',
            pass: '09213614320'
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: '"puja" <puja.goyal@tothenew.com>', // sender address
        to: to, // list of receivers
        subject: 'Buzz Registration', // Subject line
        text: 'Thanku for registering in ttn-buzz', // plain text body
        html: '<h3>Thanku for registering in ttn-buzz</h3>' ,// html body

    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log("not able to send mail");
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
       // res.send("mail send successfully")
    });
};

module.exports = {
    send:send,

};