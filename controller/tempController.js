const request = require("request");
const constant = require("../const/config");
const controller = {
  getTemp: function (req, res, next) {
    let city = req.body.city;
    // let city = argv.c || req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${constant.apiKey}`;

    request(url, function (err, response, body) {
      if (err) {
        console.log("error:", err);
        res.send(JSON.parse(err));
      } else {
        console.log("body:", JSON.parse(body));
        res.writeHead(200, { "Content-Type": "text/html" });
        res.send(JSON.parse(body));
      }
    });
  },
  getSevenDayForCast: async function (req, res, next) {
    let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${req.body.latitude}&lon=${req.body.longitude}&exclude=hourly,minutely&appid=${constant.apiKey}`;

    await request(url, function (err, response, body) {
      if (err) {
        console.log("error:", err);
        res.send(JSON.parse(err));
      } else {
        res.send(JSON.parse(body).daily);
      }
    });
  },
};
module.exports = controller;
