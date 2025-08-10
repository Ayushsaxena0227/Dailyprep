const { db } = require("../Firebase/config");

const logVisitor = async (req, res) => {
  try {
    const today = new Date().toISOString().split("T")[0];
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

    const docRef = db.collection("visitors").doc(today);
    const doc = await docRef.get();

    let visitors = doc.exists ? doc.data().ips || [] : [];

    // Only log once per IP per day
    if (!visitors.includes(ip)) {
      visitors.push(ip);
      await docRef.set(
        {
          ips: visitors,
          count: visitors.length,
        },
        { merge: true }
      );
    }

    return res.status(200).json({ message: "Visit logged" });
  } catch (err) {
    console.error("Error logging visit:", err);
    return res.status(500).json({ error: "Failed to log visit" });
  }
};

const getVisitorStats = async (req, res) => {
  try {
    const snapshot = await db.collection("visitors").get();
    let data = [];

    snapshot.forEach((doc) => {
      const date = doc.id;
      const count = doc.data().count || 0;
      data.push({ date, count });
    });

    data.sort((a, b) => new Date(a.date) - new Date(b.date));

    return res.status(200).json({ visitors: data });
  } catch (err) {
    console.error("Error fetching visitors:", err);
    return res.status(500).json({ error: "Failed to fetch visitor stats" });
  }
};

module.exports = { logVisitor, getVisitorStats };
