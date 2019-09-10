import nodemailer from "nodemailer";

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
});

const sendMail = options => {
  var mailOptions = {
    from: process.env.EMAIL,
    ...options
  };

  return new Promise((resolve, reject) => {
    transporter.sendMail(mailOptions, function(error, info) {
      console.log(mailOptions);
      if (error) {
        reject(error);
      } else {
        resolve(info);
      }
    });
  });
};

export default sendMail;
