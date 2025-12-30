const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  fullName: String,
  email: String,
  phone: Number,
  password: String,
  profileImg: String,
});

module.exports = mongoose.model("userSchema", userSchema);
