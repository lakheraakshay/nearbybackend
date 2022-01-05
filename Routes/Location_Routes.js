const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");

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

module.exports = router;
