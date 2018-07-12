const mongoose = require("../models/Profile.js");
const Profile = mongoose.model("Profile");
const profileData = require("./profile-data.json");

Profile.remove({}).then(() => {
    Profile.collection.insert(profileData).then(profile => {
      console.log(profile);
      process.exit();
    });
  });
  .catch(err => {
    console.log(err);
  });