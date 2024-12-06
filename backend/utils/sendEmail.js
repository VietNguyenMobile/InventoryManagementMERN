const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const sendEmail = async ({
  email,
  subject,
  message,
  sendTo,
  sentFrom,
  replyTo,
}) => {
  let testAccount = await nodemailer.createTestAccount();
  console.log("testAccount: ", testAccount);

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // send mail with defined transport object
  const mailOptions = {
    from: sentFrom,
    to: sendTo,
    replyTo: replyTo,
    subject: subject,
    html: message,
  };
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
