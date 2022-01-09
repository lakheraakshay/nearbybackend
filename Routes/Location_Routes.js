const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");
const { calc_distance } = require("./Function");

router.post("/set", async (req, res) => {
  try {
    const { user_id, lat, long } = req.body;
    const update_user = await USER.findByIdAndUpdate(
      user_id,
      { location: { lat: lat, long: long } },
      { new: true }
    );
    res.status(200).send({ success: true, update_user });
  } catch (e) {
    console.log(e);
  }
});
router.get("/from_distance/:curr_lat/:curr_lon/:range", async (req, res) => {
  try {
    const { curr_lat, curr_lon, range } = req.params;
    const users = await USER.find();
    const near_by = [];
    users.map((user) => {
      var R = 6371; // km
      var dLat = toRad(user.location.lat - curr_lat);
      var dLon = toRad(user.location.long - curr_lon);
      var lat1 = toRad(curr_lat);
      var lat2 = toRad(user.location.lat);

      var a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) *
          Math.sin(dLon / 2) *
          Math.cos(lat1) *
          Math.cos(lat2);
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      var d = R * c;
      console.log(d);
      if (parseInt(d)+1<=range) {
        near_by.push(user);
      }
    });
    res.status(200).send({ near_by });
  } catch (e) {
    console.log(e);
  }
});
function toRad(Value) {
  return (Value * Math.PI) / 180;
}

module.exports = router;
