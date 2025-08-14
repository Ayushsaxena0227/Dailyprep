require("dotenv").config();
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sgMail
  .send({
    to: "saxenaayush381@gmail.com",
    from: process.env.EMAIL_FROM,
    subject: "Test Email",
    text: "This is a test.",
  })
  .then(() => console.log("Sent!"))
  .catch(console.error);
