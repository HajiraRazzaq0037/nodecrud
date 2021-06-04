const User = require("../models/user");
const {
  HTTP_OK,
  HTTP_INTERNAL_SERVER_ERROR,
  SUCCESS,
  FAILED,
} = require("../const/code");
const helperFun = require("../helpers/httpResponse");

const getAllUser = (req, res) => {
  try {
    User.find((err, data) => {
      if (data) {
        return res
          .status(HTTP_OK)
          .send(helperFun.okResponse(HTTP_OK, data, SUCCESS));
      }
      return res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .send(helperFun.errorResponse(HTTP_INTERNAL_SERVER_ERROR, err, FAILED));
    });
  } catch (err) {
    return res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .send(errorResponse(HTTP_INTERNAL_SERVER_ERROR, err, err.message));
  }
};
const getUser = (req, res) => {
  try {
    User.findOne({ _id: req.params.id }, (err, data) => {
      if (data) {
        return res
          .status(HTTP_OK)
          .send(helperFun.okResponse(HTTP_OK, data, SUCCESS));
      }
      return res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .send(helperFun.errorResponse(HTTP_INTERNAL_SERVER_ERROR, err, FAILED));
    });
  } catch (err) {
    return res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .send(helperFun.errorResponse(HTTP_INTERNAL_SERVER_ERROR, err, FAILED));
  }
};
const delUser = (req, res) => {
  const id = req.params.id;
  try {
    Users.findOneAndRemove(id, (err, data) => {
      if (data) {
        return res
          .status(HTTP_OK)
          .send(helperFun.okResponse(HTTP_OK, data, SUCCESS));
      }
      return res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .send(helperFun.errorResponse(HTTP_INTERNAL_SERVER_ERROR, err, FAILED));
    });
  } catch (err) {
    return res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .send(helperFun.errorResponse(HTTP_INTERNAL_SERVER_ERROR, err, FAILED));
  }
};
const updateUser = (req, res) => {
  try {
    User.updateOne(
      { _id: req.body._id },
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      (err, data) => {
        if (data) {
          return res
            .status(HTTP_OK)
            .send(helperFun.okResponse(HTTP_OK, data, SUCCESS));
        }
        return res
          .status(HTTP_INTERNAL_SERVER_ERROR)
          .send(
            helperFun.errorResponse(HTTP_INTERNAL_SERVER_ERROR, err, FAILED)
          );
      }
    );
  } catch (err) {
    return res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .send(
        helperFun.errorResponse(HTTP_INTERNAL_SERVER_ERROR, err, err.message)
      );
  }
};
const addUser = (req, res) => {
  try {
    let payload = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
    };
    User.create(payload, (err, data) => {
      if (data) {
        return res
          .status(HTTP_OK)
          .send(helperFun.okResponse(HTTP_OK, data, SUCCESS));
      }
      return res
        .status(HTTP_INTERNAL_SERVER_ERROR)
        .send(helperFun.errorResponse(HTTP_INTERNAL_SERVER_ERROR, err, FAILED));
    });
  } catch (err) {
    return res
      .status(HTTP_INTERNAL_SERVER_ERROR)
      .send(
        helperFun.errorResponse(HTTP_INTERNAL_SERVER_ERROR, err, err.message)
      );
  }
};

module.exports = {
  getUser,
  addUser,
  updateUser,
  delUser,
  getAllUser,
};
