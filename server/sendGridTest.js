require("dotenv").config();
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

(async () => {
  try {
    const msg = {
      to: "ayush.22scse1012055@galgotiasuniversity.edu.in", // where you want to test
      from: process.env.EMAIL_FROM, // must be verified
      subject: "Test Email from DailyPrep",
      text: "Hello world from SendGrid",
    };
    await sgMail.send(msg);
    console.log("✅ Email sent successfully");
  } catch (err) {
    console.error("❌ Failed:", err);
  }
})();
