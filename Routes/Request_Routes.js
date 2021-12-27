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
});

router.post("/deleterequest", async (req, res) => {
  const request_body = req.body;
  console.log(request_body);
  await USER.findOneAndUpdate(
    { _id: request_body.curent_user_id },
    { $pull: { get_request: request_body.requested_id } }
  );
  // await USER.findOneAndUpdate({_id: request_body.requested_id}, {$addToSet: {get_request: request_body.sending_id}});
});

router.post("/acceptrequest", async (req, res) => {
  const request_body = req.body;
  console.log(request_body);
  await USER.findOneAndUpdate(
    { _id: request_body.curent_user_id },
    { $pull: { get_request: request_body.requested_id } }
  );
  await USER.findOneAndUpdate(
    { _id: request_body.curent_user_id },
    { $addToSet: { accepted_request: request_body.requested_id } }
  );
  // await USER.findOneAndUpdate({_id: request_body.requested_id}, {$addToSet: {get_request: request_body.sending_id}});
});

module.exports = router;
