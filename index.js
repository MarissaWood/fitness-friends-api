const express = require("express");
const parser = require("body-parser");
const app = express();

const userController = require("./controllers/user.js");
const activityController = require("./controllers/activity.js");
const profileController = require("./controllers/profile.js");

app.use(parser.json());

// app.get("/", (req, res) => res.send("Hello World!"));

app.use("/users", userController);
app.use("/api/activity", activityController);
app.use("/api/profile", profileController);

app.get("/", (req, res) => {
  res.redirect("/api/activities");
});

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log("Server listening on port " + app.get("port"));
});
