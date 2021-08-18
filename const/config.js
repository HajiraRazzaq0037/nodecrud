module.exports = {
  apiKey: process.env.MYAPIKEY,
  baseUrl: "http://api.openweathermap.org/data/2.5/",
  // getDbConnctionString: "mongodb://127.0.0.1:27017/users",
  getDbConnctionString:
    "mongodb+srv://root:test12345@cluster1.ot2wm.mongodb.net/UsersData?retryWrites=true&w=majority",
  TOKEN_SECRET: "Test",
};
