const express = require("express");
const app = express();
app.use(express.urlencoded());

const usersRoute = require("./routes/usersRoute");
const tempRoute = require("./routes/tempRoute");
app.use("/users", usersRoute);
app.use("/temp", tempRoute);

app.listen(3000, () => {
  console.log("app is runnining 3000 port");
});
