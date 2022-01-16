const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");
const MESSAGE = require("../Schema/MESSAGE");
router.post("/send", async (req, res) => {
  try {
    const { secondPerson, message_id, message, firstPerson } = req.body;
    if (message_id == null) {
      // SENDING MESSAGE FIRST TIME THIS IS MESSAGE ID
      const createChat = new MESSAGE({
        user_one: firstPerson,
        user_two: secondPerson,
        message,
      });

      await createChat.save();
      await USER.findByIdAndUpdate(
        firstPerson,
        {
          $push: {
            chat: { secondPerson: secondPerson, message: createChat._id },
          },
        },
        { new: true }
      );
      await USER.findByIdAndUpdate(
        secondPerson,
        {
          $push: {
            chat: { secondPerson: firstPerson, message: createChat._id },
          },
        },
        { new: true }
      );
      res.status(200).send({
        success: true,
        body: req.body,
        msg: `message is should be null ${message_id}`,
        createChat,
      });
    }

    // Message id provided by chat... message user schema
    else {
      await MESSAGE.findByIdAndUpdate(message_id, {
        $push: { message },
      });

      res.status(200).send({
        success: true,
        msg: `${message_id} Having message id`,
        body: req.body,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/all/:id", async (req, res) => {
  try {
    const messages = await MESSAGE.findById(req.params.id);
    // const messages = await MESSAGE.find();

    res.status(200).send({ success: true, messages });
  } catch (e) {
    console.log(e);
  }
});

router.get(
  "/of_one_chat/:curr_user/:second_user/:message_id",
  async (req, res) => {
    try {
      const { curr_user, second_user, message_id } = req.params;
      // if(message_id==nul)
      //    const user=await USER.findById()
    } catch (e) {
      console.log(e);
    }
  }
);

module.exports = router;
