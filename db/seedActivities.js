const mongoose = require("../models/Activity.js");
const Activity = mongoose.model("Activity");
const activityData = require("./activity-data.json");

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
