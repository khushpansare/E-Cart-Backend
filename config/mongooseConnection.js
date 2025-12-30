const mongoose = require("mongoose");

const MONGODB_URL = process.env.MONGODB_URL;

mongoose
  .connect(MONGODB_URL)
  .then((res) => {
    console.log("database Connected successfully");
  })
  .catch((err) => {
    console.log("database Connection Error", err);
  });

module.exports = mongoose.connection;
