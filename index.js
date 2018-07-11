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

app.post("/api/activity", (req, res) => {
  Activity.create(req.body)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.log(err);
    });
});

app.get("/api/activity/:id", (req, res) => {
  Activity.findById(req.params.id)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.log(err);
    });
});

app.delete("/api/activity/:id", (req, res) => {
  Activity.findByIdAndRemove(req.params.id)
    .then(activity => {
      if (!activity) {
        return res.status(404).send({
          message: "Activity not found with id " + req.params.id
        });
      }
      res.send({ message: "Activity deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Note not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete note with id " + req.params.id
      });
    });
});

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log("Server listening on port " + app.get("port"));
});
