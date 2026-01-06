const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  profileImg: String,
  productName: String,
  productPrice: Number,
  productDiscount: Number,
  createdBy: String,
});

module.exports = mongoose.model("productSchema", productSchema);
