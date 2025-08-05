// routes/subscribe.js
const express = require("express");
const router = express.Router();
const { db } = require("../Firebase/config");

router.post("/", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ error: "Email required" });
    }
    await db.collection("subscribers").add({
      email,
      createdAt: new Date().toISOString(),
    });
    return res.status(200).json({ message: "Subscribed" });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
