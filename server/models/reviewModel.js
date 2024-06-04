const { db } = require('../config/firebaseConfig');

const addReview = async (review) => {
  try {
    await db.collection('reviews').add(review);
  } catch (error) {
    throw new Error('Error adding review: ' + error.message);
  }
};

const getReviews = async () => {
  try {
    const reviewsSnapshot = await db.collection('reviews').orderBy('timestamp', 'desc').get();
    return reviewsSnapshot.docs.map(doc => doc.data());
  } catch (error) {
    throw new Error('Error getting reviews: ' + error.message);
  }
};

module.exports = { addReview, getReviews };
