const handler = (err, data, res) => {
  const response = {};
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
    res.status(response.statusCode).send(response.body);
  }
};

module.exports = {
  handler,
};
