var fs = require("fs");
const userController = require("../controller/userController");
const tempController = require("../controller/tempController");

exports = module.exports = function (app) {
  const resData = JSON.parse(fs.readFileSync(`./data.json`, "utf-8"));
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
  app.put(`/updateuser/:id`, userController.updateUser);
  app.post(`/adduser`, userController.addUser);

  app.get(`/getTemp`, tempController.getTemp);
  app.get(`/getSevenDayForCast`, tempController.getSevenDayForCast);
};
