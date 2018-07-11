const mongoose = require("../models/Activity.js");
const Activity = mongoose.model("Activity");
const activityData = require("./activity-data.json");
const Profile = require("../models/Profile.js").model("Profile");
const profileData = require("./profile-data.json");

Activity.remove({})
  .then(() => {
    Activity.collection.insert(activityData).then(activity => {
      console.log(activity);
      process.exit();
    });
  })
  .catch(err => {
    console.log(err);
  });

Profile.remove({}).then(() => {
  Profile.collection.insert(profileData).then(profile => {
    console.log(profile);
    process.exit();
  });
});
