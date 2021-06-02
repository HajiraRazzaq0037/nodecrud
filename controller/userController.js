const Users = require("../models/user");
const getAllUser = (req, res) => {
  const response = {};
  try {
    Users.find(async (err, data) => {
      if (err) {
        response.statusCode = 500;
        response.body = JSON.stringify({ err });
        res.status(response.statusCode).send(response.body);
      } else {
        response.statusCode = 200;
        response.body = JSON.stringify({
          message: "Ok",
          data: data,
        });
      }
      await res.status(response.statusCode).send(response.body);
    });
  } catch (err) {
    response.statusCode = 500;
    response.body = JSON.stringify({ err });
    res.status(response.statusCode).send(response.body);
  }
};
const getUser = (req, res) => {};
const delUser = (req, res) => {};
const updateUser = (req, res, next) => {};
const addUser = (req, res, next) => {
  const response = {};
  try {
    let payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    Users.create(payload, async (err, data) => {
      if (err) {
        response.statusCode = 500;
        response.body = JSON.stringify({ err });
        res.status(response.statusCode).send(response.body);
      } else {
        response.statusCode = 200;
        response.body = JSON.stringify({
          message: "Ok",
          data: data,
        });
      }
      await res.status(response.statusCode).send(response.body);
    });
  } catch (err) {
    response.statusCode = 500;
    response.body = JSON.stringify({ err });
    res.status(response.statusCode).send(response.body);
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  delUser,
  getAllUser,
};
