const Users = require("../models/user");
const helperFun = require("../helpers/function");

const getAllUser = (req, res) => {
  const response = {};
  try {
    Users.find((err, data) => {
      helperFun.handler(err, data, res);
    });
  } catch (err) {
    response.statusCode = 500;
    response.body = { err };
    res.status(response.statusCode).send(response.body);
  }
};
const getUser = (req, res) => {
  const response = {};
  try {
    Users.findOne({ _id: req.params.id }, (err, data) => {
      helperFun.handler(err, data, res);
    });
  } catch (err) {
    response.statusCode = 500;
    response.body = { err };
    res.status(response.statusCode).send(response.body);
  }
};
const delUser = (req, res) => {
  const response = {};
  const id = req.params.id;
  try {
    Users.findOneAndRemove(id, (err, data) => {
      helperFun.handler(err, data, res);
    });
  } catch (err) {
    response.statusCode = 500;
    response.body = { err };
    res.status(response.statusCode).send(response.body);
  }
};
const updateUser = (req, res, next) => {
  const response = {};
  try {
    Users.updateOne(
      { _id: req.body._id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      (err, data) => {
        helperFun.handler(err, data, res);
      }
    );
  } catch (err) {
    response.statusCode = 500;
    response.body = { err };
    res.status(response.statusCode).send(response.body);
  }
};
const addUser = (req, res, next) => {
  const response = {};
  try {
    let payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    Users.create(payload, (err, data) => {
      helperFun.handler(err, data, res);
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
