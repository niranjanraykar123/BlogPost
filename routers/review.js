const express = require("express");
const router = express.Router({ mergeParams: true });
let Expresserror = require("../utils/Expresserror.js");
let { reviewschema } = require("../schemajoi.js");
let Review = require("../models/review.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewcontroller = require("../controllers/review.js");

//Router to post new review
router.post("/", isLoggedIn, reviewcontroller.createReview);

//router to delete review
router.delete(
  "/:reviewid",
  isLoggedIn,
  isReviewAuthor,
  reviewcontroller.deleteReview
);
module.exports = router;
