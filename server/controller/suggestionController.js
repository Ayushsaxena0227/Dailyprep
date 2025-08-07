const { db } = require("../Firebase/config");
const getAllSuggestions = async (req, res) => {
  try {
    const snapshot = await db.collection("suggestions").get();
    let allSuggestions = [];
    for (const doc of snapshot.docs) {
      const date = doc.id;
      const itemsSnap = await db
        .collection("suggestions")
        .doc(date)
        .collection("items")
        .get();
      itemsSnap.forEach((itemDoc) => {
        allSuggestions.push({
          date,
          suggestion: itemDoc.data().suggestion,
          createdAt: itemDoc.data().createdAt,
        });
      });
    }
    // Sort by date, latest first
    allSuggestions.sort((a, b) => b.date.localeCompare(a.date));
    res.json({ suggestions: allSuggestions });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const addSuggestion = async (req, res) => {
  try {
    const { suggestion, date } = req.body;
    if (!suggestion || !date) {
      return res.status(400).json({ error: "Suggestion and date required" });
    }
    await db.collection("suggestions").doc(date).collection("items").add({
      suggestion,
      createdAt: new Date().toISOString(),
    });
    return res.status(200).json({ message: "Suggestion submitted" });
  } catch (err) {
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addSuggestion, getAllSuggestions };
