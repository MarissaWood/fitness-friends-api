const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

const User = new Schema({
  username: String,
  email: String,
  password: String
});

module.exports = mongoose.model("User", User);
