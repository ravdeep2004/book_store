const reviewService = require("../services/review.service");

exports.addReview = async (req, res) => {
  try {
    const { rating, comment } = req.body;

    const review = await reviewService.addReview(
      req.user.id,
      req.params.bookId,
      rating,
      comment
    );

    res.status(201).json(review);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getReviews = async (req, res) => {
  const reviews = await reviewService.getReviewsByBook(
    req.params.bookId
  );
  res.json(reviews);
};
