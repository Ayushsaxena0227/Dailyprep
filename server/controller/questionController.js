const { db } = require("../Firebase/config");

const getTodayQuestions = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const doc = await db.collection("questions").doc(today).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "No questions found for today" });
    }

    // doc.data().questions is an array of { text, audioUrl }
    return res.status(200).json({ questions: doc.data().questions });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const addQuestions = async (req, res) => {
  try {
    const { date, questions } = req.body; // questions: [{text, audioUrl}]
    if (!date || !questions || !Array.isArray(questions)) {
      return res.status(400).json({ error: "Invalid data" });
    }
    await db.collection("questions").doc(date).set({ questions });
    return res.status(200).json({ message: "Questions added successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getTodayQuestions, addQuestions };
