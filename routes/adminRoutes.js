const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const adminSchema = require("../models/adminSchema");

const JWT_KEY = process.env.JWT_KEY;

router.get("/", (req, res) => {
  res.send("I'm Admin Route");
});

router.post("/register", async (req, res) => {
  try {
    const { fullName, email, password, phone } = req.body;

    let adminExist = await adminSchema.findOne({ email: email });
    // res.send(userExist);
    if (adminExist)
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
          let user = await adminSchema.create({
            fullName,
            email,
            isAdmin: true,
            password: hash,
            phone,
          });
          let token = jwt.sign({ email, id: user._id }, JWT_KEY);
          res.cookie("token", token);
          res.send("Your Account created succesfylly.");
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

    let adminExist = await adminSchema.findOne({ email: email });
    if (!adminExist)
      return res
        .status(401)
        .send(`This ${email} user not registered, please register then login.`);

    bcrypt.compare(password, adminExist.password, (comperr, result) => {
      if (result) {
        let token = jwt.sign({ email, id: adminExist._id }, JWT_KEY);
        res.cookie("token", token);
        res.send("You can logged-in");
      } else {
        return res.send("Email or Password incoorect.");
      }
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
