const express = require("express");
const parser = require("body-parser");
const app = express();

const Activity = require("./models/Activity");
// const User = require("./models/User");
// const Profile = require("./models/Profile");

app.use(parser.json());

// app.get("/", (req, res) => res.send("Hello World!"));

app.get("/", (req, res) => {
  res.redirect("/api/activity");
});

// Activity Collection:
app.get("/api/activity", (req, res) => {
  Activity.find({})
    .then(items => {
      res.json(items);
    })
    .catch(err => {
      console.log(err);
    });
});

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log("Server listening on port " + app.get("port"));
});
