const express = require("express");
const app = express();
// app.use(express.urlencoded());

const endpoints = require("./routes");

app.use(function (req, res, next) {
  console.log("Middleware called");
  endpoints(app);
  next();
});

app.listen(3000, () => {
  console.log("app is runnining 3000 port");
});
