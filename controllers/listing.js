const Listing=require("../models/listing")
let { listingschema } = require("../schemajoi.js");
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//All Blogs

//Functionality code for Home page
module.exports.index = async (req, res, next) => {
    try {
      let allist = await Listing.find({});
      res.render("listings/index.ejs", { allist });
    } catch (err) {
      next(err);
    }
  };
  //Providing form to add blogs
  module.exports.renderNewForm = (req, res) => {
    res.render("listings/new.ejs");
  };
  //Displaying particular blog in detail
  module.exports.showListing = async (req, res, next) => {
    Listing.findById(req.params.id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner")
      .then((result) => {
        // console.log(result);
        console.log(result);
        res.render("listings/show.ejs", { listing: result });
      })
      .catch((err) => {
        next(err);
      });
  
    //
  };
  //Creating new entry of blog in database
  module.exports.createListing = (req, resp, next) => {
    let url = req.file.path;
    let filename = req.file.filename;
    let result = listingschema.validate(req.body);
    if (result.error) {
      throw new Expresserror(400, result.error.message);
    }
  
    let list = new Listing(req.body.listing);
    console.log(req.body.listing);
    list.owner = req.user._id;
    list.image = { url, filename };
    list
      .save()
      .then((res) => {
  
        req.flash("success", "New Listing Created");
        resp.redirect("/listings");
      })
      .catch((err) => {
        next(err);
      });
  };