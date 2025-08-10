const { db } = require("../Firebase/config");
const logDailyVisit = async (req, res) => {
  try {
    const { email } = req.body;
    const today = new Date().toISOString().split("T")[0];
    const userRef = db.collection("userProgress").doc(email);
    const doc = await userRef.get();

    let streak = 1;
    let totalQuestions = 0;
    let badges = [];
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];

    if (doc.exists) {
      const data = doc.data();
      streak = data.streak || 0;
      totalQuestions = data.totalQuestions || 0;
      badges = data.badges || [];

      if (data.lastVisit === today) {
        return res.status(200).json(data);
      } else if (data.lastVisit === yesterdayStr) {
        streak += 1;
      } else {
        streak = 1; // reset streak
      }
    }

    // Badge unlock check
    if (streak === 7 && !badges.includes("streak_7")) badges.push("streak_7");
    if (streak === 30 && !badges.includes("streak_30"))
      badges.push("streak_30");

    await userRef.set(
      { email, lastVisit: today, streak, totalQuestions, badges },
      { merge: true }
    );

    res.status(200).json({ email, streak, totalQuestions, badges });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log visit" });
  }
};

const logQuestionCompleted = async (req, res) => {
  try {
    const { email } = req.body;
    const userRef = db.collection("userProgress").doc(email);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: "User progress not found" });
    }

    const data = doc.data();
    let totalQuestions = (data.totalQuestions || 0) + 1;
    let badges = data.badges || [];

    // Badge unlock check
    if (totalQuestions === 50 && !badges.includes("questions_50"))
      badges.push("questions_50");
    if (totalQuestions === 100 && !badges.includes("questions_100"))
      badges.push("questions_100");

    await userRef.set({ totalQuestions, badges }, { merge: true });

    res.status(200).json({ ...data, totalQuestions, badges });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to log question" });
  }
};

const getProgress = async (req, res) => {
  try {
    const { email } = req.query;
    const doc = await db.collection("userProgress").doc(email).get();
    if (!doc.exists) {
      return res.status(404).json({ error: "No progress found" });
    }
    res.json(doc.data());
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch progress" });
  }
};

module.exports = { logDailyVisit, logQuestionCompleted, getProgress };
