const { readData } = require("./Collection.js");
const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, the api is working on /code/");
});

app.get("/code/", (req, res) => {
  console.log(req.query.code);
  readData("nuclear-codes", { code: req.query.code }).then((data) => {
    if (data.length > 0) res.send([data[0].url]);
    else res.send(false);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
