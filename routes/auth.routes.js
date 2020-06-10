const { Router } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");

const saltRounds = 10;
const router = new Router();

//SIGNUP ROUTES
router.get("/signup", (req, res, next) => res.render("auth/signup"));

module.exports = router;
