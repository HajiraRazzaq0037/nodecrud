var fs = require("fs");
const findUser = require("../model");
const resData = JSON.parse(fs.readFileSync(`./data.json`, "utf-8"));
const controller = {
  getUser: function (req, res) {
    const id = parseInt(req.params.id);
    // return Not found and 404 for an non existing id or if id !== int
    if (isNaN(id) || !id) {
      return res.status(404).send({
        status: "error",
        error: "Not found",
      });
    }
    return res.status(200).send({
      status: "success",
      data: findUser(id),
    });
  },
  delUser: function (req, res) {
    const id = parseInt(req.params.id);
    // return Not found and 404 for an non existing id or if id !== int
    if (isNaN(id) || !id) {
      return res.status(404).send({
        status: "error",
        error: "Not found",
      });
    }
    let filteredData = resData.filter((sin) => sin.id !== id);
    fs.writeFile("../data.json", JSON.stringify(filteredData), (err) => {
      if (err) {
        return err;
      }
      return res.status(200).send({
        status: "success",
        data: filteredData,
      });
    });
  },
  updateUser: function (req, res, next) {
    const id = parseInt(req.params.id);
    // return Not found and 404 for an non existing id or if id !== int
    if (
      isNaN(id) || !id || resData.find((sin) => sin.id === id) ? false : true
    ) {
      return res.status(404).send({
        status: "error",
        error: "Not found",
      });
    }
    let filteredData = resData.find((sin) => sin.id === id);
    (filteredData.title = req.body.title),
      (filteredData.body = req.body.body),
      fs.writeFile("../data.json", JSON.stringify(resData), (err) => {
        if (err) {
          return err;
        }
        return res.status(200).send({
          status: "success",
          data: resData,
        });
      });
  },
  addUser: function (req, res, next) {
    let user = {
      title: req.body.title,
      body: req.body.body,
      id: parseFloat(resData[resData.length - 1].id) + 1,
      userId: 1,
    };
    resData.push(user);
    fs.writeFile("../data.json", JSON.stringify(resData), (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!");
      res.send("done");
    });
  },
};
module.exports = controller;
