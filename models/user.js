let mongoose = require("mongoose");
let Schema = mongoose.Schema;

let userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: String,
});

let User = mongoose.model("Users", userSchema);

module.exports = User;
