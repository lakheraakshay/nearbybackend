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

router.get("/message_id/:curr_user/:other_user", async (req, res) => {
  try {
    const { curr_user, other_user } = req.params;
    let findIt = 5;
    const user = await USER.findById(curr_user);
    const filterit = user.chat.find((item) => item.secondPerson == other_user);
    if (filterit == undefined) {
      res.status(200).send({ success: true, messageId: null });
    } else {
      const messages = await MESSAGE.findById(filterit.message);
      res.status(200).send({ success: true, messages: messages.message });
    }
    // console.log(filterit);
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
