const mongoose = require("mongoose");

const adminSchema = mongoose.Schema({
  fullName: String,
  isAdmin: Boolean,
  email: String,
  phone: Number,
  password: String,
  products: Array,
  profileImg: String,
});

module.exports = mongoose.model("adminSchema", adminSchema);
