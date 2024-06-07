const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

// Logowanie zmiennych środowiskowych (bez kluczy prywatnych)
console.log('FIREBASE_PROJECT_ID:', process.env.FIREBASE_PROJECT_ID);
console.log('FIREBASE_CLIENT_EMAIL:', process.env.FIREBASE_CLIENT_EMAIL);

const app = express();

// Middleware CORS
app.use(cors({
  origin: 'https://pwi-project-client.vercel.app', // Domena twojego frontendu
}));

// Middleware do parsowania JSON
app.use(express.json());

const serviceAccount = {
  type: "service_account",
  project_id: process.env.FIREBASE_PROJECT_ID,
  private_key_id: process.env.FIREBASE_PRIVATE_KEY_ID,
  private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQC/D7Z8mCmiVEF7\n/n5iKP4M9ZvTeKQGx2HwpEf1bCXYnjXegg5vtd5cEh/e9Dx44x5aAukAyEF3DkZZ\nEIa+ju8q9uez/zaTyXG/t+vRceKB8BQ30fSPLhxSdlpyRehrWquP8FDfIWIs9+x/\n4s+VO7xjcSptqWt2Ybef+xVOytev62NbrhLFdysufC2qeaaWfw7gtRRW0LkDHMgH\n3baQaZ2ab67vFzV34DF3sjBN5FZsg0Vw3MYO3CYTPPV9EXaZwqckQVH8S4uzt260\nmVuisy6PPvdSUbTSK5ub90jyZAszJVF6ctxNPhdmrvQ7lXC+RyunNllJQsfYemBE\nHFo+Fjh3AgMBAAECggEAOJbb0w1yj2zrNGGNZ1+C163LaJg75PIbFR5jXdKZZw59\nIBlfU0EHyjdoDy5B1wBWFgz0nFGz6iJlPa4CauCFADG/MPXvYVhyA3njM9bKYvgL\n1PivudTLeLUrVttT2rAxTmG8YkpN/Mm1168DEs1tn/p9uZtLg/WvYIgKqJq1xZms\nBoku8Cfz0auJ8uyCYJaxkkUPK1rJxYcFgeMuQ6xMdqvIyFDa04/q8T12q5jc1x9a\nrBW0j8Qz9oMNqa4jlRsTclY0tZoUhZcZX32OxV+ZZrw2hcwVQtFYkDq8G3CdbV3/\nPlw5GIXXZ4S7mxs/fItAu3B0Z8sgOsjivZCedO4WmQKBgQDxAwuRX0itfCTtJ6Vy\nFE9VOqaPZNj73dkLNHRhjVecoHkF5ns/HQA52+kElHoL+XEVQiZxlrUUB80JRsCQ\nS0HjXVBqtCF8p4jm9XJVrZ2j6doOqPtBpOn/gFDsARB6bQsEXL9kKcXVda3VF2xP\nzOYIW+/FW4Vf3WWhmxRcJnpVlQKBgQDK8XItStEu9CVuZowFYpYJ5oonnl314L2L\nkX/83NfJ1gxZZpgzpi8aqUWvA5RoprAYeiUXPhmzdhQQLjHPpVBDg7YOY1XNlbBi\nOynymQLUiUgWunmA/+FUV6PTkezbJLlRooqoixeCKgd6EG7IMA3c2H6eDdi7c4rX\nBshl1o562wKBgFIT9mmQqKCkabL2UIrUTdw5uCWXc6n6+IKvX38lcpPdtrmCr7Bj\nwQLzWJz9r77KOW/C8nK2n35t1a72EHhTmOHEkrF0HP9l0uLM7h4tnUUITAG4HLFT\nZ3ljCqwFBMacwia/K1MCQuSaShQLAREAN8ra/IIa1AY80PLDbKChXgItAoGAVA0x\n065j+sVlZ1cTcPuG1qzj1UrS8Y3WEyL81jaFLPP5A2HpcaLHaYxn7vdVlQ5MaqbU\nC89Nh7VE0/q96Jk4J+46DbV4iQARIG4Ojopu0KXW9Irg3duccHknwe1zIsQP+M6Q\nDQQmhWNw205JA6Jba3dC4aUseV5+R1Zo0zzMn/cCgYANeONYhohylTEN4AV5DWza\nANBAVD9qvBMj6WzQefcuo6CRbetLA2vl+D91MZSCrDwZ/jESWz+EJ4U2K4RYd4TE\nQNq68QOCeHsnoIvZaUCoJY9PTbvUhGYXVd5ZVCLAHhhO4K89FSNn9odHXiha54fO\n2flGWWWhnQ+h9wZwhEmBrA==\n-----END PRIVATE KEY-----\n",
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

// Przykładowa trasa API
app.get('/api/reviews', async (req, res) => {
  try {
    const reviews = await db.collection('reviews').get();
    const reviewsData = reviews.docs.map(doc => doc.data());
    res.json(reviewsData);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// Trasa do obsługi POST
app.post('/api/reviews', async (req, res) => {
  const { name, email, message } = req.body;
  try {
    await db.collection('reviews').add({ name, email, message });
    res.status(201).send('Review added successfully');
  } catch (error) {
    res.status(500).send(error.message);
  }
});

module.exports = { db };
