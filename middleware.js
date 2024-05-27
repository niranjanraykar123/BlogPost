//Implementing authorization using middlewares
const Listing = require("./models/listing.js");
const Review = require("./models/review.js");


//Middleware to check wheather user is logged in or not
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to create Blog");
    return res.redirect("/login");
  }
  next();
};
//Middleware to redirect user to the page for what user is looking for after login
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

//Middleware to check wheather user is owner of blog or not
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner._id.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the owner of this Blog ! ");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

//Middleware to check wheather user is owner of review or not
module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewid } = req.params;
  let review = await Review.findById(reviewid);
  // console.log(review);
  if (!review.author.equals(res.locals.currUser._id)) {
    req.flash("error", "You are not the author of this review ! ");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
