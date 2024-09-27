const nodemailer = require('nodemailer');
module.exports.sendEmail = (email, subject, text) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'qui214291@student.nctu.edu.vn',
      pass: 'modu hrqx gvfv nkzd'
    }
  });
  const mailOptions = {
    from: 'qui214291@student.nctu.edu.vn',
    to: email,
    subject: subject,
    text: text
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
      // do something useful
    }
  });
}