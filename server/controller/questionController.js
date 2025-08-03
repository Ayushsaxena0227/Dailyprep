const { db } = require("../Firebase/config");

const getTodayQuestions = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0]; // yyyy-mm-dd
    const doc = await db.collection("questions").doc(today).get();

    if (!doc.exists) {
      return res.status(404).json({ message: "No questions found for today" });
    }

    return res.status(200).json(doc.data());
  } catch (error) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getTodayQuestions };
