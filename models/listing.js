//Model structure for Blog along with Schema Validations

const mongoose = require("mongoose");
const Review = require("./review.js");
const listingschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,

  image: {
    url: String,
    filename: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },

  country: String,
  createdAt: {
    type: String,
    default: new Date().toLocaleDateString(),
  },
});
listingschema.post("findOneAndDelete", async (data) => {
  let res = await Review.deleteMany({ _id: { $in: data.reviews } });
  console.log(res);
});

let Listing = mongoose.model("Listing", listingschema);
module.exports = Listing;
