const sgMail = require("@sendgrid/mail");
const { db } = require("../Firebase/config");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function notifySubscribers(subject, htmlContent) {
  try {
    const subsSnap = await db.collection("subscribers").get();
    if (subsSnap.empty) {
      console.log("No subscribers to notify.");
      return;
    }

    const emails = subsSnap.docs.map((doc) => doc.data().email).filter(Boolean);

    // Break into smaller chunks (SendGrid free limit = ~100 per request)
    const chunkSize = 80;
    for (let i = 0; i < emails.length; i += chunkSize) {
      const chunk = emails.slice(i, i + chunkSize);
      const msg = {
        to: chunk,
        from: process.env.EMAIL_FROM,
        subject,
        html: htmlContent,
      };
      await sgMail.sendMultiple(msg);
    }

    console.log(`Email notifications sent to ${emails.length} subscribers.`);
  } catch (err) {
    console.error("Error sending notifications:", err);
  }
}

module.exports = { notifySubscribers };
