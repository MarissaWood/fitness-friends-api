# Fitness-Friends-API

## Description

This is the back end  server of the Fitness Friends App we built for General Assembly's WDI group project.  This was built with Mongo, Express and Node. for details about the front end, please visit [https://github.com/lenelow/fitness-friends](https://github.com/lenelow/fitness-friends).

## Collections

In our database, we have collections for Users, Profiles and Activities. 

The Activity model is defined below: 

```js
const Activity = new Schema({
  name: String,
  location: String,
  date: String,
  time: String,
  description: String
});
```

It has 'create', 'read', and 'delete' functionality.  

```js

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
```

## Installation Instructions / Deployed Version

To run this program locally:

1. Clone this repository
```
$ git clone git@github.com:MarissaWood/fitness-friends-api.git
```
2. Run npm install
```
$ npm install
```
3. Run mongod
```
$ mongod
``` 
4. seed the databases so there is data to display
```
$ node db/seedActivities.js
$ node db/seedProfiles.js
```
5. run node index.js
```
$ node index.js
```
5. navigate to https://localhost:3001/

A deployed version of this project can be found at [https://fitness-friends-api.herokuapp.com/](https://fitness-friends-api.herokuapp.com/)


## Contribution guidelines

If you would like to contribute to this project, make sure you check out the front end [repository](https://github.com/lenelow/fitness-friends). 

If you find a bug, create an issue with very clear instructions on how to recreate the bug.

If you want to contribute to the code, checkout a new branch and create a pull request into the development branch.  


## Future Directions & Unsolved Problems

 In the future, we would like to add the ability for users to join or RSVP to a friend's activity event and link them to both user's profiles. Currently, the activity events are only tied to a single user and only that user can perform basic CRUD on the activity.  



