const express = require("express");
const bp = require("body-parser");
const app = express();
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
var fs = require("fs");
const userController = require("./controller/userController");
const tempController = require("./controller/tempController");

const resData = JSON.parse(fs.readFileSync(`./data.json`, "utf-8"));
console.log(process.env.MYAPIKEY);
app.get(`/users`, (req, res) => {
  res.status(200).send({
    status: "success",
    data: {
      resData,
    },
  });
});
app.get(`/users/:id`, userController.getUser);
app.delete(`/delusers/:id`, userController.delUser);
app.post(`/updateuser/:id`, userController.updateUser);
app.post(`/adduser`, userController.addUser);
app.post(`/getTemp`, tempController.getTemp);
app.post(`/getSevenDayForCast`, tempController.getSevenDayForCast);

app.listen(3000, () => {
  console.log("app is runnining 3000 port");
});
