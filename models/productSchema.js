const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  profileImg: String,
  productName: String,
  productPrice: Number,
  productDiscount: Number,
});

module.exports = mongoose.model("adminSchema", productSchema);
