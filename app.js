const express = require("express");
const bp = require("body-parser");
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));

const endpoints = require("./routes");
endpoints(app);

app.listen(3000, () => {
  console.log("app is runnining 3000 port");
});
