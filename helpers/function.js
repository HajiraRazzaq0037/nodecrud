const errorHandler = (err) => {
  const response = {};
  return (req, res) => {
    response.statusCode = 500;
    response.body = { err };
    res.status(response.statusCode).send(response.body);
  };
};

const successHandler = (data) => {
  const response = {};
  return (req, res) => {
    response.statusCode = 200;
    response.body = {
      message: "ok",
      data: data,
    };
    res.status(response.statusCode).send(response.body);
  };
};

module.exports = {
  errorHandler,
  successHandler,
};
