const express = require('express');
const { postReview, fetchReviews } = require('../controllers/reviewController');
const router = express.Router();

router.post('/reviews', postReview);
router.get('/reviews', fetchReviews);

module.exports = router;
