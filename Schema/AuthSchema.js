const mongoose = require("mongoose");
const authSchema = mongoose.Schema({
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  name: {
    type: String,
    require: true,
  },
  location: { type: Object, lat: { type: Number }, long: { type: Number } },
  email: {
    type: String,
    require: true,
    unique: true,
  },
  profession: { type: String },
  about_me: { type: String },

  age: {
    type: Number,
    require: true,
  },
  state: {
    type: String,
    require: true,
  },
  dob: {
    type: Object,
    month: Number,
    date: Number,
    year: Number,
  },
  age_group: {
    //   type: Object,
    age_12_to_18: { type: Boolean, default: false },
    age_19_to_32: { type: Boolean, default: false },
    age_33_to_64: { type: Boolean, default: false },
    age_65_to_100: { type: Boolean, default: false },
    //   required: true,
  },
  city: {
    type: String,
    require: true,
  },
  country: {
    type: String,
    require: true,
  },
  gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] },
  password: {
    type: String,
    require: true,
  },
  image: { type: String },
  send_request: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
  get_request: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
  accepted_request: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
});
const USER_AUTH = mongoose.model("USER", authSchema);
module.exports = USER_AUTH;
