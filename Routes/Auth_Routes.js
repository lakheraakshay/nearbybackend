const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");

dotenv.config();
router.post("/signup", async (req, res) => {
  try {
    const { age, password } = req.body;
    // res.status(200).send({ success: true, body: req.body });
    let age_group = {
      age_12_to_18: false,
      age_19_to_32: false,
      age_33_to_64: false,
      age_64_to_100: false,
    };
    console.log(age);
    if (age < 19) {
      age_group = { ...age_group, age_12_to_18: true };
    } else if (age < 33) {
      age_group = { ...age_group, age_19_to_32: true };
    } else if (age < 65) {
      age_group = { ...age_group, age_33_to_64: true };
    } else {
      age_group = { ...age_group, age_65_to_100: true };
    }

    // const password = password;
    // console.log(password, typeof password);

    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });
    console.log(hashedPassword);

    const new_user = new USER({
      ...req.body,
      age_group,
      password: hashedPassword,
    });
    await new_user.save();
    res.status(200).send({
      success: true,
      msg: "registration successfull",
      new_user: new_user,
    });
  } catch (e) {
    console.log(e);
    res.status(200).send({
      success: false,
      msg: "Error !! Try again later",
      error: e,
      bodyData: req.body,
    });
  }
});
router.get("/all", async (req, res) => {
  try {
    const users = await USER.find();
    res.status(200).send({ success: true, users });
  } catch (e) {
    console.log(e);
    res.status(200).send({ success: false, msg: "Error while fetching users" });
  }
});

router.post("/login/remove this", async (req, res) => {
  const user_log_details = req.params;
  const exist_user = await USER.findOne({ email: user_log_details.email });
  console.log(user_log_details, user_log_details.email);
  console.log(exist_user);
  if (exist_user) {
    const match = await bcrypt.compare(
      user_log_details.password,
      exist_user.password
    );
    if (match) {
      res.status(200).send({
        success: true,
        msg: "Successfully Logged In",
        user: exist_user,
      });
    } else {
      res.status(400).send({ success: false, msg: "Check Email / Password" });
    }
  } else {
    res.json({
      status: "User does not exists",
      success: false,
      user_log_details,
      exist_user,
    });
  }
});
router.post("/login/:email", async (req, res) => {
  try {
    const { email } = req.params;
    const exist_user = await USER.find({ email });
    if (exist_user.length) {
      res.status(200).send({
        success: true,
        msg: "getting data to check",
        exist_user,
        email,
      });
    } else {
      res.status(200).send({
        success: false,
        msg: "User Does Not Exists!!",
        email,
        exist_user,
      });
    }
  } catch (e) {
    console.log(e);
  }
});

router.get("/", async (req, res) => {
  const all = await user.find();
  // console.log(all);
  var users_arr = [];
  all.map((element) => {
    var temp_user = {
      id: element._id,
      name: element.name,
    };
    users_arr.push(temp_user);
  });
  // console.log(req.query.curnt_user);
  const requests = all.filter((item, index) => {
    return item._id == req.query.curnt_user;
  });
  console.log(requests[0].send_request);
  res.send({
    users: users_arr,
    send_request: requests[0].send_request,
    get_request: requests[0].get_request,
  });
});

router.patch("/update/:user_id", async (req, res) => {
  try {
    const data = req.body;

    console.log(req.params);
    const updated_user = await USER.findByIdAndUpdate(
      req.params.user_id,
      { userName: "akshaylakhera9dd2" },
      { new: true }
    );
    res.status(200).send({
      success: true,
      msg: "User Successfully Updated",
      updated_user,
      params: req.params.user_id,
      data,
    });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
