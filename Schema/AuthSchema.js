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
  location: { type: Object, lat: { type: Number }, long: { type: Number } },
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
  send_request: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
  get_request: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
  accepted_request: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
});
const USER_AUTH = mongoose.model("USER", authSchema);
module.exports = USER_AUTH;
