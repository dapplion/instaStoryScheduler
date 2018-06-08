var nodemailer = require('nodemailer');


var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAILUSER,
    pass: process.env.EMAILPASS
  }
});

exports.send = function(subject, text) {
  var mailOptions = {
    from: '"Insta-story poster 👻" <insta-story-poster-dapplion@dapplion.io>', // sender address
    to: process.env.EMAILTO,
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
