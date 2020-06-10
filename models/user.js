const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const pwdRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    match: [
      pwdRegex,
      "Password needs to have at least 6 chars and must contain at least one number, one lowercase and one uppercase letter.",
    ],
    required: true,
  },
});

const User = mongoose.model("User", userSchema);
module.exports = User;
