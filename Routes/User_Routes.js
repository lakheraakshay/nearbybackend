const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");
const res = require("express/lib/response");

router.post("/drop", async (req, res) => {
  try {
    // await USER.dropCollection("USER", () => {
    //   console.log("deleted");
    // });
  } catch (e) {
    console.log(e);
  }
});

router.get("/with_requests", async (req, res) => {
  const user = await USER.find()
    .populate({ path: "get_request" })
    .populate({ path: "send_request" });
  res.status(200).send({ success: true, user });
});
router.get("/all", async (req, res) => {
  try {
    const user = await USER.find();
    res.status(200).send({ success: true, user });
  } catch (e) {
    console.log(e);
  }
});
router.get("/gender/:gender", async (req, res) => {
  try {
    const { gender } = req.params;
    if (gender == "MALE" || gender == "FEMALE") {
      const users = await USER.find({ gender });
    } else {
      const users = await USER.find();
      res
        .status(200)
        .send({ success: true, msg: `All ${gender} USERS`, users });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/one/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;
    const user = await USER.findById(user_id)
      .populate({ path: "get_request" })
      .populate({ path: "send_request" });

    res
      .status(200)
      .send({ success: true, msg: "Successfully fetched details", user });
  } catch (e) {
    console.log(e);
  }
});

router.get("/byage/:from/:to", async (req, res) => {
  try {
    const { from, to } = req.params;
    const users = await USER.find({
      age: { $gt: from, $lt: to },
    });
    // console.log(users)
    res.status(200).send({ success: true, users });
  } catch (e) {
    console.log(e);
  }
});
module.exports = router;
