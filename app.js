const express = require("express");
const app = express();
app.use(express.urlencoded());

const endpoints = require("./routes");
endpoints(app);

app.listen(3000, () => {
  console.log("app is runnining 3000 port");
});
