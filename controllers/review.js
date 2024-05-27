const Listing = require("../models/listing");
const Review = require("../models/review");
let { reviewschema } = require("../schemajoi.js");
let Expresserror=require("../utils/Expresserror.js")

//Functionalities to Create review
module.exports.createReview = async (req, res, next) => {
  let result = reviewschema.validate(req.body);
  if (result.error) {
    return next(new Expresserror(400, result.error.message));
  }

  try {
    let listing = await Listing.findById(req.params.id);
    let rev = new Review(req.body.review);
    rev.author = req.user._id;
    console.log(rev);
    await rev.save();
  
    listing.reviews.push(rev);
    let response = await listing.save();
    console.log("Inserted");
    req.flash("success", "New Review Created");
    res.redirect(`/listings/${req.params.id}`);
  } catch (err) {
    next(err);
  }
};

//Deleting reviews
module.exports.deleteReview = async (req, res) => {
    let rev = await Review.findByIdAndDelete(req.params.reviewid);
    console.log(rev);
    let list = await Listing.findByIdAndUpdate(req.params.id, {
      $pull: { reviews: req.params.reviewid },
    });
    req.flash("success", "Review Deleted");
    console.log(list);
    res.redirect(`/listings/${req.params.id}`);
  };
  