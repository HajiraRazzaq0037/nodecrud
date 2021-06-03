const Users = require("../models/user");
const helperFun = require("../helpers/function");

const getAllUser = (req, res) => {
  const response = {};
  try {
    Users.find((err, data) => {
      helperFun.handler(err, data, res);
    });
  } catch (err) {
    helperFun.handler(err, data, res);
  }
};
const getUser = (req, res) => {
  const response = {};
  try {
    Users.findOne({ _id: req.params.id }, (err, data) => {
      helperFun.handler(err, data, res);
    });
  } catch (err) {
    helperFun.handler(err, data, res);
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
    helperFun.handler(err, data, res);
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
    helperFun.handler(err, data, res);
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
    helperFun.handler(err, data, res);
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  delUser,
  getAllUser,
};
