const { db } = require("../Firebase/config");
const { notifySubscribers } = require("../Utils/notifySubscribers");
const getAllQuestions = async (req, res) => {
  try {
    const snapshot = await db.collection("questions").get();
    let allQuestions = [];
    snapshot.forEach((doc) => {
      const date = doc.id;
      const questions = doc.data().questions || [];
      questions.forEach((q) => {
        allQuestions.push({ ...q, date });
      });
    });
    allQuestions.sort((a, b) => b.date.localeCompare(a.date));
    res.json({ questions: allQuestions });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getTodayQuestions = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const doc = await db.collection("questions").doc(today).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "No questions found for today" });
    }

    return res.status(200).json({ questions: doc.data().questions });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const addQuestions = async (req, res) => {
  try {
    const { date, questions } = req.body;
    if (!date || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: "Invalid data" });
    }
    const docRef = db.collection("questions").doc(date);
    const doc = await docRef.get();
    let existingQuestions = [];
    if (doc.exists) {
      existingQuestions = doc.data().questions || [];
    }

    const updatedQuestions = [...existingQuestions, ...questions];
    await docRef.set({ questions: updatedQuestions });

    const viewUrl = "https://dailyprep.vercel.app/all-questions";
    await notifySubscribers(
      `🔥 New Interview Questions for ${date}`,
      `
        <h2 style="font-family: sans-serif; color: #4f46e5;">
          Your Daily Questions are Live!
        </h2>
        <p style="font-family: sans-serif;">
          We've just uploaded new interview questions with audio explanations for <strong>${date}</strong>.
        </p>
        <p style="font-family: sans-serif;">
          <a href="${viewUrl}" style="
            background: linear-gradient(90deg,#8b5cf6,#3b82f6);
            padding: 10px 20px;
            color: white;
            text-decoration: none;
            border-radius: 5px;
          ">View Questions Now</a>
        </p>
        <p style="font-family: sans-serif; color: #6b7280; font-size: 14px;">
          —Ayushcodes
        </p>
      `
    );

    return res
      .status(200)
      .json({ message: "Questions added & notifications sent" });
  } catch (error) {
    console.error("Error in addQuestions:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
module.exports = { getTodayQuestions, addQuestions, getAllQuestions };
