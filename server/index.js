const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Load environment variables
require('dotenv').config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Firebase Admin SDK configuration
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: "pwi-project-23da7",
    privateKey: process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n'),
    clientEmail: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
  }),
  databaseURL: "https://pwi-project-23da7.firebaseio.com"
});

const db = admin.firestore();

app.post("/add-data", async (req, res) => {
  try {
    const { data } = req.body;
    const docRef = await db.collection("testCollection").add({ data });
    res.status(200).send(`Document written with ID: ${docRef.id}`);
  } catch (error) {
    res.status(500).send("Error adding document: " + error);
  }
});

app.listen(5000, () => {
  console.log("Server started on port 5000");
});
