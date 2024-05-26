const mongoose=require("mongoose");
const listingschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:String,

    image:{
         url:String,
         filename:String
    },
    
    country:String,
   
})

let Listing=mongoose.model("Listing",listingschema);
module.exports=Listing;