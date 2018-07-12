const express = require("express");
const parser = require("body-parser");

const cors = require("cors");
const passport = require("./config/passport")();
const userController = require("./controllers/users.js");

const Activity = require("./models/Activity");
const User = require("./models/User");
const Profile = require("./models/Profile");

const app = express();

app.use(parser.json());
app.use(cors());
app.use(passport.initialize());
app.use("/users", userController);

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

//Profile Collection

// Rendering profile form
app.get("/api/profile", (req, res) => {
  Profile.find({})
    .then(items => {
      console.log(items);
      res.json(items);
    })
    .catch(err => {
      console.log(err);
    });
});

//Submitting profile form
app.post("/api/profile", (req, res) => {
  Profile.create(req.body)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.log(err);
    });
});

//Rendering individual profile
app.get("/api/profile/:id", (req, res) => {
  Profile.findById(req.params.id)
    .then(item => {
      res.json(item);
    })
    .catch(err => {
      console.log(err);
    });
});

//Update profile, by adding new activity object id to the array
app.put("/api/profile/:id", (req, res) => {
  Profile.findById(req.params.id, function(err, profile) {
    if (err) {
      res.send(err);
    }
    profile.activities.push(`ObjectId(${req.body.itemid})`);
    // save the item
    profile.save(function(err) {
      if (err) {
        res.send(err);
      }
      res.json(profile);
    });
  });
});

// Deleting profile
app.delete("/api/profile/:id", (req, res) => {
  Profile.findByIdAndRemove(req.params.id)
    .then(profile => {
      if (!profile) {
        return res.status(404).send({
          message: "Profile not found with id " + req.params.id
        });
      }
      res.send({ message: "Profile deleted successfully!" });
    })
    .catch(err => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Profile not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Could not delete profile with id " + req.params.id
      });
    });
});

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log("Server listening on port " + app.get("port"));
});
