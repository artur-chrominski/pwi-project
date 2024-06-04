const { addReview, getReviews } = require('../models/reviewModel');

const postReview = async (req, res) => {
  try {
    const review = req.body;
    await addReview(review);
    res.status(201).send('Review added successfully');
  } catch (error) {
    res.status(500).send('Error adding review: ' + error.message);
  }
};

const fetchReviews = async (req, res) => {
  try {
    const reviews = await getReviews();
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).send('Error getting reviews: ' + error.message);
  }
};

module.exports = { postReview, fetchReviews };
