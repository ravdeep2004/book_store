const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const reviewController = require("../controllers/review.controller");

router.post("/:bookId", auth, reviewController.addReview);
router.get("/:bookId", reviewController.getReviews);

module.exports = router;
