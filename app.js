const express = require("express");
const app = express();
const cookie_parser = require("cookie-parser");

require("dotenv").config();

// IMPORT components
const database = require("./config/mongooseConnection");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

// Routes
app.use("/admin", adminRoutes);
app.use("/user", userRoutes);
app.use("/product", productRoutes);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(process.env.PORT);
