const Listing=require("../models/listing")
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

//All Blogs
module.exports.index=async(req,res,next)=>{
    try{
   let allist=await Listing.find({})
    res.render("listings/index.ejs",{allist});
    }
    catch(err){
        next(err);
    }
};