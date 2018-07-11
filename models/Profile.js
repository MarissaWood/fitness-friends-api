const mongoose = require("../db/connection.js");
const Schema = mongoose.Schema;

const Profile = new Schema({
  username: String,
  image: String,
  bio: String,
  preferences: {
    type: [String],
    enum: [
      "biking",
      "running",
      "swimming",
      "cycling",
      "yoga",
      "pilates",
      "weightlifting",
      "crossfit",
      "solidcore"
    ]
  }
});

module.exports = mongoose.model("Profile", Profile);
