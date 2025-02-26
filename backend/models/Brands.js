const mongoose = require("mongoose");


const BrandSchema = new mongoose.Schema({
  name: String,
  image: String, // Store image path
  products: [
    {
      name: String,
      price: Number,
      discount: String,
      image: String,
      quantity: Number,
    },
  ],
});

module.exports = mongoose.model("Brand", BrandSchema);
