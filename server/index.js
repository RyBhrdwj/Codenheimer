const { readData } = require("./Collection.js");
const express = require("express");
const app = express();

app.get("/", (req, res) => {
  console.log(req.query.code);
  readData("nuclear-codes", { code: req.query.code }).then((data) => {
    res.send(data.length > 0 ? true : false);
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
