const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.urlencoded());

const usersRoute = require("./routes/usersRoute");
const tempRoute = require("./routes/tempRoute");
const constant = require("./const/config");
app.use("/users", usersRoute);
app.use("/temp", tempRoute);

app.listen(3000, () => {
  console.log("app is runnining 3000 port");
  mongoose.connect(constant.getDbConnctionString),
    { useNewUrlParser: true, useUnifiedTopology: true };
});
