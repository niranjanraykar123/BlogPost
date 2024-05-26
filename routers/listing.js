const express=require("express");
const router=express.Router();
 const Listing=require("../models/listing.js")

const listingcontroller=require("../controllers/listing.js");
const multer  = require('multer')


router.route("/")
.get(listingcontroller.index)

module.exports=router;