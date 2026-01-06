const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = require("../models/userSchema");

const JWT_KEY = process.env.JWT_KEY;

router.get("/", (req, res) => {
  res.send(`I'm User Route, ${JWT_KEY}`);
});

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;
    let userExist = await userSchema.findOne({ email: email });

    if (userExist)
      return res
        .status(401)
        .send(
          "This email already in use. Login using same email or create new account using new email"
        );

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        if (err) {
          res.send(err.message);
        } else {
          let user = await userSchema.create({
            fullName,
            email,
            phone,
            password: hash,
          });
          let token = jwt.sign({ email, id: user._id }, JWT_KEY);
          res.cookie("token", token);
          res.send("You account created successfully.");
        }
      });
    });
  } catch (error) {
    res.send(error.message);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    let userExist = await userSchema.findOne({ email: email });
    if (!userExist)
      return res
        .status(401)
        .send(`This ${email} user not registered, please register then login.`);

    bcrypt.compare(password, userExist.password, (comperr, result) => {
      if (result) {
        let token = jwt.sign({ email, id: userExist._id }, JWT_KEY);
        res.cookie("token", token);
        res.send("You can loggedin");
      } else {
        return res.send("Email or Password incoorect.");
      }
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
