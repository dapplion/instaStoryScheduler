var nodemailer = require('nodemailer');



var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: emailSource,
    pass: emailSourcePass
  }
});

exports.send = function(subject, text) {
  var mailOptions = {
    from: emailSource,
    to: emailTo,
    subject: subject,
    text: text
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}
