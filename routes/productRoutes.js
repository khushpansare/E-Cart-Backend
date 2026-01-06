const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const productSchema = require("../models/productSchema");

router.get("/", (req, res) => {
  res.send("Products Route working");
});

router.post("/add", async (req, res) => {
  try {
    const { profileImg, productName, productPrice, productDiscount } = req.body;

    const decoded_token = jwt.decode(req.cookies.token);

    let product = await productSchema.create({
      profileImg,
      productName,
      productPrice,
      productDiscount,
      createdBy: decoded_token.id,
    });

    res.send({
      message: "Your product add succesfully.",
      products: product,
    });
  } catch (err) {
    res.send(err.message);
  }
});

module.exports = router;
