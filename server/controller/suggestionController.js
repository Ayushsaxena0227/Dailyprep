const { db } = require("../Firebase/config");

const getAllSuggestions = async (req, res) => {
  try {
    const allSuggestions = [];

    // Use listDocuments to get all date documents (even empty ones)
    const suggestionsRef = db.collection("suggestions");
    const dateDocsSnapshot = await suggestionsRef.listDocuments();

    for (const dateDocRef of dateDocsSnapshot) {
      const date = dateDocRef.id;

      try {
        const itemsSnapshot = await dateDocRef.collection("items").get();
        itemsSnapshot.forEach((itemDoc) => {
          const data = itemDoc.data();

          if (data && data.suggestion) {
            allSuggestions.push({
              date,
              suggestion: data.suggestion,
              createdAt: data.createdAt || new Date().toISOString(),
            });
          }
        });
      } catch (subError) {
        console.error(`Error fetching items for date ${date}:`, subError);
      }
    }

    // Sort by createdAt, latest first
    allSuggestions.sort((a, b) => {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b.date.localeCompare(a.date);
    });

    res.json({ suggestions: allSuggestions });
  } catch (err) {
    console.error("Error in getAllSuggestions:", err);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: err.message });
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
    console.error("Error in addSuggestion:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { addSuggestion, getAllSuggestions };
