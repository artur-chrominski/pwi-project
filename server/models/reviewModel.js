const { db, bucket } = require('../config/firebaseConfig');
const { v4: uuidv4 } = require('uuid');

const addReview = async (review, file) => {
  try {
    let imageUrl = '';
    if (file) {
      const fileName = `${uuidv4()}-${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      await fileUpload.save(file.buffer, {
        metadata: { contentType: file.mimetype },
      });

      imageUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
    }

    await db.collection('reviews').add({
      ...review,
      imageUrl: imageUrl,
      timestamp: new Date()
    });
  } catch (error) {
    throw new Error('Error adding review: ' + error.message);
  }
};

const getReviews = async () => {
  try {
    const reviewsSnapshot = await db.collection('reviews').orderBy('timestamp', 'desc').get();
    return reviewsSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
        ...data,
        timestamp: data.timestamp.toDate() // Konwersja Timestamp do Date
      };
    });
  } catch (error) {
    throw new Error('Error getting reviews: ' + error.message);
  }
};

module.exports = { addReview, getReviews };
