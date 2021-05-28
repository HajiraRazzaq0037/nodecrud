const axios = require("axios");
const redis = require("redis");
const constant = require("../const/config");

const redisPort = 6379;
const client = redis.createClient(redisPort);

client.on("error", (err) => {
  console.log(err);
});
const getTemp = (req, res, next) => {
  const city = req.query.city;
  try {
    client.get(city, async (err, data) => {
      if (err) throw err;
      if (data) {
        // res.status(200).send({
        //   data: JSON.parse(data),
        //   message: "data retrieved from the cache",
        // });
        console.log("datafrom cache");
        res.send(data);
      } else {
        let url = `${constant.baseUrl}weather?q=${city}&appid=${constant.apiKey}`;
        axios
          .get(url)
          .then((response) => {
            client.setex(city, 600, JSON.stringify(response.data));
            res.send(response.data);
          })
          .catch((error) => {
            res.send(error);
          });
      }
    });
  } catch (err) {
    res.send(err.message);
  }
};

getSevenDayForCast = (req, res, next) => {
  const {
    query: { longitude, latitude },
  } = req;
  try {
    client.get("temp", async (err, data) => {
      if (err) throw err;
      if (data) {
        // res.status(200).send({
        //   data: JSON.parse(data),
        //   message: "data retrieved from the cache",
        // });
        console.log("datafrom cache");
        res.send(data);
      } else {
        let url = `${constant.baseUrl}onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&appid=${constant.apiKey}`;
        axios
          .get(url)
          .then((response) => {
            client.setex("temp", 600, JSON.stringify(response.data));
            res.send(response.data);
          })
          .catch((error) => {
            res.send(error);
          });
      }
    });
  } catch (err) {
    res.send(err.message);
  }
};
module.exports = {
  getTemp,
  getSevenDayForCast,
};
