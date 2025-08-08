const { db } = require("../Firebase/config");

const getStats = async (req, res) => {
  try {
    // Subscribers count
    const subsSnap = await db.collection("subscribers").get();
    const totalSubscribers = subsSnap.size;

    // Suggestions count (correct way)
    const suggestionsRef = db.collection("suggestions");
    const dateDocsSnapshot = await suggestionsRef.listDocuments();
    let totalSuggestions = 0;
    for (const dateDocRef of dateDocsSnapshot) {
      const itemsSnapshot = await dateDocRef.collection("items").get();
      totalSuggestions += itemsSnapshot.size;
    }

    // Questions count
    const qSnap = await db.collection("questions").get();
    let totalQuestions = 0;
    for (const doc of qSnap.docs) {
      const arr = doc.data().questions || [];
      totalQuestions += arr.length;
    }

    res.json({
      totalSubscribers,
      totalSuggestions,
      totalQuestions,
    });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { getStats };
