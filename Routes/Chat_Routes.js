const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");
const MESSAGE = require("../Schema/MESSAGE");

router.get("/members/:curr_id", async (req, res) => {
  try {
    const { curr_id } = req.params;
    const chats = await USER.findById(curr_id).populate({
      path: "chat",
      populate: { path: "secondPerson", select: "userName avatar name" },
    });
    res.status(200).send({ success: true, chats });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
