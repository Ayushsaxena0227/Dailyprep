const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccountkey.json"); // from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
module.exports = { db };
