const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");

router.get("/all", async (req, res) => {
  const user = await USER.find();
  res.status(200).send({ success: true, user });
});

module.exports = router;
