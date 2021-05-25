const request = require("request");
const constant = require("../const/config");
const getTemp = (req, res, next) => {
  let url = `${constant.baseUrl}weather?q=${req.query.city}&appid=${constant.apiKey}`;
  request(url, function (err, response, body) {
    if (err) {
      res.send(JSON.parse(err));
    } else {
      res.send(JSON.parse(body));
    }
  });
};

getSevenDayForCast = (req, res, next) => {
  let url = `${constant.baseUrl}onecall?lat=${req.query.latitude}&lon=${req.query.longitude}&exclude=hourly,minutely&appid=${constant.apiKey}`;
  request(url, function (err, response, body) {
    if (err) {
      res.send(JSON.parse(err));
    } else {
      res.send(JSON.parse(body));
    }
  });
};
module.exports = {
  getTemp,
  getSevenDayForCast,
};
