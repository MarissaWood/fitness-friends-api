const express = require("express");
const parser = require("body-parser");
const app = express();

app.use(parser.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.set("port", process.env.PORT || 3001);

app.listen(app.get("port"), () => {
  console.log("Server listening on port " + app.get("port"));
});
