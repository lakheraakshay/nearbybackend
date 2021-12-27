const mongoose = require("mongoose");
const authSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  age: {
    type: Number,
    require: true,
  },
  city: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  send_request: [],
  get_request: [],
  accepted_request: [],
});
const USER_AUTH = mongoose.model("ADMINPOST", authSchema);
module.exports = USER_AUTH;
