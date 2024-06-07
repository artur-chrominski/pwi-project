const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();

app.use(cors({
  origin: 'https://pwi-project-client.vercel.app',
}));

app.use(express.json());

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  client_email: process.env.FIREBASE_CLIENT_EMAIL,
  client_id: process.env.FIREBASE_CLIENT_ID,
  auth_uri: process.env.FIREBASE_AUTH_URI,
  token_uri: process.env.FIREBASE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.FIREBASE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.FIREBASE_CLIENT_X509_CERT_URL
};

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://pwi-project-23da7.firebaseio.com"
});

const db = admin.firestore();

app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await db.collection('reviews').get();
    const reviewsData = reviews.docs.map(doc => doc.data());
    res.json(reviewsData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/api/reviews', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await db.collection('reviews').add({ name, email, message });
    res.status(201).send('Review added successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Uruchom serwer
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = { db };
