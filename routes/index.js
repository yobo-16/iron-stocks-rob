//require("dotenv").config();
const express = require("express");
const router = express.Router();
const Stock = require("../models/stock");

/* GET home page */
router.get("/", (req, res, next) => {
  Stock.find({})
    .then((stock) => {
      res.render("index", { data: stock });
    })
    .catch((err) => console.log(err));
});
router.post("/", (req, res, next) => {
  Stock.create(req.body)
    .then(() => res.redirect("/"))
    .catch((e) => console.log(e));
});
router.get("/delete/:_id", (req, res, next) => {
  Stock.findByIdAndDelete(req.params).then(() => {
    res.redirect("/");
  });
});

module.exports = router;
