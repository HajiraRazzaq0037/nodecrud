let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  email: { type: String, required: true },
  name: { type: String },
  // password: { type: String, required: true },
});

let User = mongoose.model("Users", userSchema);

module.exports = User;
