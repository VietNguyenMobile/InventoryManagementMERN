const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async ({ subject, message, sendTo, sentFrom, replyTo }) => {
  console.log("process.env.EMAIL_HOST: ", process.env.EMAIL_HOST);
  console.log("process.env.EMAIL_USER: ", process.env.EMAIL_USER);
  console.log("process.env.EMAIL_PASS: ", process.env.EMAIL_PASS);
  console.log("process.env.SMTP_PORT: ", process.env.SMTP_PORT);
  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  console.log("transporter: ", transporter);

  // send mail with defined transport object
  const mailOptions = {
    from: `"Nguyen Quốc Việt"<${process.env.EMAIL_USER}>`,
    to: sendTo,
    // replyTo: process.env.EMAIL_USER,
    subject: subject,
    html: message,
  };
  console.log("mailOptions: ", mailOptions);
  await transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error: ", error);
    } else {
      console.log("info: ", info);
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = sendEmail;
