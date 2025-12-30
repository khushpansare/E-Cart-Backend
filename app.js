const express = require("express");
const app = express();
const cookie_parser = require("cookie-parser");

require("dotenv").config();

// IMPORT components
const database = require("./config/mongooseConnection");
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie_parser());

// Routes
app.use("/admin", adminRouter);
app.use("/user", userRouter);

app.get("/", (req, res) => {
  res.send("API is working");
});

app.listen(process.env.PORT);
