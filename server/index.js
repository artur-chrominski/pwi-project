require('dotenv').config();
const express = require("express");
const admin = require("firebase-admin");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://pwi-project-client.vercel.app',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
}));

// Dodatkowe nagłówki CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://pwi-project-client.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
});

console.log("Ładowanie zmiennych środowiskowych...");
console.log("Project ID: ", process.env.GOOGLE_CLOUD_PROJECT_ID);
console.log("Private Key Loaded: ", process.env.GOOGLE_CLOUD_PRIVATE_KEY ? "Yes" : "No");
console.log("Client Email: ", process.env.GOOGLE_CLOUD_CLIENT_EMAIL);

try {
  const privateKey = process.env.GOOGLE_CLOUD_PRIVATE_KEY.replace(/\\n/g, '\n');
  console.log("Private Key Length: ", privateKey.length);
  console.log("Private Key (first 50 chars): ", privateKey.substring(0, 50));

  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
      privateKey,
      clientEmail: process.env.GOOGLE_CLOUD_CLIENT_EMAIL,
    }),
    databaseURL: "https://pwi-project-23da7.firebaseio.com"
  });
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Error initializing Firebase: ", error);
  process.exit(1); // Wyjdź z procesu, jeśli inicjalizacja Firebase się nie powiedzie
}

const db = admin.firestore();

app.post("/add-data", async (req, res) => {
  try {
    const { firstName, lastName, email, text } = req.body;
    console.log("Received data: ", req.body);

    if (!firstName || !lastName || !email || !text) {
      return res.status(400).send("All fields are required.");
    }

    const docRef = await db.collection("testCollection").add({
      firstName,
      lastName,
      email,
      text
    });
    res.status(200).send(`Document written with ID: ${docRef.id}`);
  } catch (error) {
    console.error("Error adding document: ", error);
    res.status(500).send("Error adding document: " + error.message);
  }
});

app.get("/get-data", async (req, res) => {
  try {
    const snapshot = await db.collection("testCollection").get();
    const data = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    res.status(200).json(data);
  } catch (error) {
    console.error("Error getting documents: ", error);
    res.status(500).send("Error getting documents: " + error.message);
  }
});

const PORT = process.env.PORT || 5002;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
