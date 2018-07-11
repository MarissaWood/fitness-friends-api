const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

const Activity = new Schema({
  name: String,
  location: String,
  date: String,
  time: String,
  description: String
});

module.exports = mongoose.model("Activity", Activity);
