const Review = require("../models/Review");
const Book = require("../models/Book");

exports.addReview = async (userId, bookId, rating, comment) => {
  //create review
  const review = await Review.create({
    userId,
    bookId,
    rating,
    comment,
  });

  //avg rating recalculate
  const stats = await Review.aggregate([
    { $match: { bookId: review.bookId } },
    {
      $group: {
        _id: "$bookId",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  //update book summary fields
  await Book.findByIdAndUpdate(bookId, {
    averageRating: stats[0].avgRating,
    reviewCount: stats[0].count,
  });

  return review;
};

exports.getReviewsByBook = async (bookId) => {
  return await Review.find({ bookId })
    .populate("userId", "name")
    .sort({ createdAt: -1 });
};
