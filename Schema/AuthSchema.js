const mongoose = require("mongoose");
const authSchema = mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  // location: { type: Object, lat: { type: Number }, long: { type: Number } },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  profession: { type: String },
  about_me: { type: String },

  age: {
    type: Number,
    // required: true,
  },
  state: {
    type: String,
    required: true,
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
    //   requiredd: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  cover_images: { type: Array },
  gender: { type: String, enum: ["MALE", "FEMALE", "OTHER"] },
  password: {
    type: String,
    required: true,
  },
  chat: [
    {
      secondPerson: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
      message: { type: mongoose.Schema.Types.ObjectId, ref: "MESSAGE" },
    },
  ],
  image: { type: String },
  send_request: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
  get_request: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],
  accepted_request: [{ type: mongoose.Schema.Types.ObjectId, ref: "USER" }],

  location_3: {
    type: {
      type: String,
      default: "Point",
    },
    coordinates: { type: [Number] },
  },
});
// authSchema.index({ location: "2dsphere" });
// authSchema.createIndex({ location: "2dsphere" });
// mongoose.authSchema.createIndex({ location: "2dsphere" });
const USER_AUTH = mongoose.model("USER", authSchema);
module.exports = USER_AUTH;
