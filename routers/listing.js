const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
let Expresserror = require("../utils/Expresserror.js");
let { listingschema } = require("../schemajoi.js");
let Review = require("../models/review.js");
const { isLoggedIn, isOwner } = require("../middleware.js");
const listingcontroller = require("../controllers/listing.js");
const multer = require("multer");

const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

//Routes for getting all blogs and posting new blog 
router
  .route("/")
  .get(listingcontroller.index)
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    listingcontroller.createListing
  );

//route for rendering form to add new blog
router.get("/new", isLoggedIn, listingcontroller.renderNewForm);

//route for getting particular blog and updating and deleting previous blog
router
  .route("/:id")
  .get(listingcontroller.showListing)
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    listingcontroller.updateListing
  )
  .delete(isLoggedIn, isOwner, listingcontroller.deleteListing);

  //rendering form for updating blog
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  listingcontroller.renderUpdateForm
);

module.exports = router;