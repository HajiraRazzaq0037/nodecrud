const express = require("express");
const bp = require("body-parser");
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
var fs = require("fs");
const controller = require("./controller");

const resData = JSON.parse(fs.readFileSync(`./data.json`, "utf-8"));

app.get(`/users`, (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      resData,
    },
  });
});
app.get(`/users/:id`, controller.getUser);
app.delete(`/delusers/:id`, controller.delUser);
app.update(`/updateuser/:id`, controller.updateUser);
app.post(`/adduser`, controller.addUser);

app.listen(3000, () => {
  console.log("app is runnining 3000 port");
});
