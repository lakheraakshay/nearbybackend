const mongoose = require("mongoose");
const message = mongoose.Schema({
  user_one: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
  user_two: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
  message: [
    {
      sender_id: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
      receiver_id: { type: mongoose.Schema.Types.ObjectId, ref: "USER" },
      text: { type: String },
      time: { type: Number, default: new Date().getTime() },
    },
  ],
});
const USER_AUTH = mongoose.model("MESSAGE", message);
module.exports = USER_AUTH;
