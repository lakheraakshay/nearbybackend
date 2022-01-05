const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");

router.post("/sendrequest", async (req, res) => {
  const request_body = req.body;
  console.log(request_body);
  await USER.findOneAndUpdate(
    { _id: request_body.sending_id },
    { $addToSet: { send_request: request_body.requested_id } }
  );
  await USER.findOneAndUpdate(
    { _id: request_body.requested_id },
    { $addToSet: { get_request: request_body.sending_id } }
  );

  res.status(200).send({ success: true, msg: "request sent" });
});

router.post("/deleterequest", async (req, res) => {
  try {
    const { curent_user_id, requested_id } = req.body;

    await USER.findByIdAndUpdate(
      curent_user_id,
      {
        $pull: { get_request: requested_id },
      },
      { new: true }
    ).exec();
    res.status(200).send({ success: true, msg: "Request Deleted" });
  } catch (e) {
    console.log(e);
  }
  // await USER.findOneAndUpdate({_id: request_body.requested_id}, {$addToSet: {get_request: request_body.sending_id}});
});

router.post("/acceptrequest", async (req, res) => {
  try {
    const request_body = req.body;
    console.log(request_body);
    await USER.findByIdAndUpdate(
      request_body.curent_user_id,
      {
        $push: { accepted_request: request_body.requested_id },
      },

      { new: true }
    ).exec();
    await USER.findByIdAndUpdate(
      request_body.curent_user_id,
      {
        $pull: { get_request: request_body.requested_id },
      },

      { new: true }
    ).exec();

    res.status(200).send({ success: true, msg: "Request Accepted" });
  } catch (e) {
    console.log(e);
  }

  // await USER.findOneAndUpdate({_id: request_body.requested_id}, {$addToSet: {get_request: request_body.sending_id}});
});

module.exports = router;
