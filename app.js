const express = require("express");
// const serveStatic = require("serve-static");
const path = require("path");
const axios = require("axios");
require("./database/connection");
const app = express();

app.use(express.urlencoded());

app.use(express.json());

//here we are configuring build to serve app files
// app.use("/", serveStatic(path.join(__dirname, "/client/build")));

const usersRoute = require("./routes/usersRoute");
const tempRoute = require("./routes/tempRoute");

app.use("/users", usersRoute);
app.use("/temp", tempRoute);

// this * route is to serve project on different page routes except root `/`
// app.get(/.*/, function (req, res) {
//   res.sendFile(path.join(__dirname, "/client/build/index.html"));
// });

const port = process.env.PORT || 8081;
app.listen(port);
console.log(`app is listening on port: ${port}`);
