const request = require("request");
const constant = require("../const/config");
const URL = require("url");
const controller = {
  getTemp: function (req, res, next) {
    const queryObject = URL.parse(req.url, true).query;
    console.log("queryObject", queryObject.city);
    let url = `${constant.baseUrl}weather?q=${queryObject.city}&appid=${constant.apiKey}`;
    request(url, function (err, response, body) {
      if (err) {
        res.send(JSON.parse(err));
      } else {
        res.send(JSON.parse(body));
      }
    });
  },
  getSevenDayForCast: function (req, res, next) {
    const queryObject = URL.parse(req.url, true).query;
    let url = `${constant.baseUrl}onecall?lat=${queryObject.latitude}&lon=${queryObject.longitude}&exclude=hourly,minutely&appid=${constant.apiKey}`;
    request(url, function (err, response, body) {
      if (err) {
        console.log("error:", err);
        res.send(JSON.parse(err));
      } else {
        res.send(JSON.parse(body));
      }
    });
  },
};

module.exports = controller;
