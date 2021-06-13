const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const {
  HTTP_OK,
  HTTP_INTERNAL_SERVER_ERROR,
  HTTP_INVALID_REQUEST,
  SUCCESS,
  DELETE_SUCCESS,
  HTTP_CREATED,
  FAILED,
} = require("../const/code");
const helperFun = require("../helpers/httpResponse");
const config = require("../const/config");

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
          .send(helperFun.okResponse(HTTP_OK, data, DELETE_SUCCESS));
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
        email: req.body.email,
        name: req.body.name,
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
      email: req.body.email,
      name: req.body.name,
    };
    User.create(payload, (err, data) => {
      if (data) {
        return res
          .status(HTTP_CREATED)
          .send(helperFun.okResponse(HTTP_CREATED, data, SUCCESS));
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
const register = (req, res) => {
  try {
    //Hash password
    const salt = bcrypt.genSalt(10);
    const hasPassword = bcrypt.hash(req.body.password, salt);
    // Create an user object
    let user = new User({
      email: req.body.email,
      name: req.body.name,
      password: hasPassword,
    });
    User.create(user, (err, data) => {
      if (data) {
        let payload = {
          id: data._id,
        };
        const token = jwt.sign(payload, config.TOKEN_SECRET);
        return res
          .status(HTTP_CREATED)
          .send(helperFun.okResponse(HTTP_CREATED, token, SUCCESS));
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
const login = (req, res) => {
  try {
    User.findOne({ email: req.body.email }, (err, user) => {
      if (user) {
        const validPass = bcrypt.compare(req.body.password, user.password);
        if (!validPass)
          return res
            .status(HTTP_INVALID_REQUEST)
            .send("Mobile/Email or Password is wrong");
        // Create and assign token
        let payload = { id: user._id, user_type_id: user.user_type_id };
        const token = jwt.sign(payload, config.TOKEN_SECRET);
        return res
          .status(HTTP_OK)
          .header("auth-token", token)
          .send(helperFun.okResponse(HTTP_OK, token, SUCCESS));
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
  register,
  login,
};
