const admin = require("firebase-admin");

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "pwi-project-23da7",
    privateKey: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  }),
  databaseURL: "https://pwi-project-23da7.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;
