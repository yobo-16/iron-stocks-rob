const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  company: String,
});

const Stock = mongoose.model("Stock", stockSchema);
module.exports = Stock;
