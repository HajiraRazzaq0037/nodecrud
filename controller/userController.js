const Users = require("../models/user");

// const handler = (err, data)=>{
//   if (err) {
//     response.statusCode = 500;
//     response.body = err;
//     res.status(response.statusCode).send(response.body);
//   } else {
//     response.statusCode = 200;
//     response.body = {
//       message: "Ok",
//       data: data,
//     };
// }

const getAllUser = (req, res) => {
  const response = {};
  try {
    Users.find(async (err, data) => {
      if (err) {
        response.statusCode = 500;
        response.body = err;
        res.status(response.statusCode).send(response.body);
      } else {
        response.statusCode = 200;
        response.body = {
          message: "Ok",
          data: data,
        };
      }
      await res.status(response.statusCode).send(response.body);
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
    Users.findOne({ _id: req.params.id }, async (err, data) => {
      if (err) {
        response.statusCode = 500;
        response.body = { err };
        res.status(response.statusCode).send(response.body);
      } else {
        response.statusCode = 200;
        response.body = {
          message: "ok",
          data: data,
        };
      }
      await res.status(response.statusCode).send(response.body);
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
    Users.findOneAndRemove(id, async (err, data) => {
      if (err) {
        response.statusCode = 500;
        response.body = { err };
        res.status(response.statusCode).send(response.body);
      } else {
        response.statusCode = 200;
        response.body = {
          message: "ok",
          data: data,
        };
      }
      await res.status(response.statusCode).send(response.body);
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
      async (err, data) => {
        if (err) {
          response.statusCode = 500;
          response.body = { err };
          res.status(response.statusCode).send(response.body);
        } else {
          response.statusCode = 200;
          response.body = {
            message: "ok",
            data: data,
          };
        }
        await res.status(response.statusCode).send(response.body);
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
    Users.create(payload, async (err, data) => {
      if (err) {
        response.statusCode = 500;
        response.body = { err };
        res.status(response.statusCode).send(response.body);
      } else {
        response.statusCode = 200;
        response.body = {
          message: "Ok",
          data: data,
        };
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
