var http = require("http");
const request = require("request");
var fs = require("fs");
var StringDecoder = require("string_decoder").StringDecoder;
var decoder = new StringDecoder("utf-8");

const constant = require("./const/config");
const resData = fs.readFileSync(`./data.json`, "utf-8");

http
  .createServer(function (req, res) {
    if (req.url === "/" || req.url === `/get`) {
      res.writeHead(200, {
        "content-type": "application/json",
      });
      res.end(resData);
    }
    if (req.url === "/getSevenDayForCast") {
      var buffer = "";
      req.on("data", function (data) {
        buffer += decoder.write(data);
      });
      req.on("end", function () {
        buffer += decoder.end();
        let url = `https://api.openweathermap.org/data/2.5/onecall?lat=${
          JSON.parse(buffer).latitude
        }&lon=${JSON.parse(buffer).longitude}&exclude=hourly,minutely&appid=${
          constant.apiKey
        }`;
        request(url, function (err, response, body) {
          if (err) {
            res.end(err);
          } else {
            // Send the response
            res.end(body);
          }
        });
      });
    }
    if (req.url === "/getTemp") {
      var buffer = "";
      req.on("data", function (data) {
        buffer += decoder.write(data);
      });
      req.on("end", function () {
        buffer += decoder.end();
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${
          JSON.parse(buffer).city
        }&appid=${constant.apiKey}`;
        request(url, function (err, response, body) {
          if (err) {
            res.end(err);
          } else {
            // Send the response
            res.end(body);
          }
        });
      });
    } else {
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 not found</h1>");
    }
  })
  .listen(3000, () => {
    console.log("server is listening on 3000 port");
  });
