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