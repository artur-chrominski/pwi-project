const admin = require("firebase-admin");
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
    privateKey: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  }),
  databaseURL: "https://pwi-project-23da7.firebaseio.com"
});

const db = admin.firestore();

module.exports = db;
