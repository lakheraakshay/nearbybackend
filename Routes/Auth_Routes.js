const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");

dotenv.config();
const AuthSchema = require("../Schema/AuthSchema");
router.post("/signup", async (req, res) => {
  // console.log(req.body)
  const sing_user = req.body;
  console.log(sing_user);
  const password = sing_user.password;
  // console.log(password, typeof password);
  const saltRounds = 10;

  const hashedPassword = await new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) reject(err);
      resolve(hash);
    });
  });
  console.log(hashedPassword);
  const exist_user = await USER.findOne({ email: sing_user.email });
  // console.log("((((((((((((((((((()))))))))))))))))))", exist_user);
  if (!exist_user) {
    const new_user = new USER({
      userName: sing_user.userName,
      name: sing_user.name,
      email: sing_user.email,
      password: hashedPassword,
      age: sing_user.age,
      country: sing_user.country,
      city: sing_user.city,
    });
    await new_user.save();
    res
      .status(200)
      .send({ success: true, msg: "registration successfull", new_user: new_user });
  } else {
    res.json({ status: "Already existing" });
  }
  // res.json({msg: 'Hey all is good now'});
});
router.get("/all", async (req, res) => {
  try {
    const users = await USER.find();
    res.status(200).send({ success: true, users });
  } catch (e) {
    console.log(e);
  }
});

router.post("/login", async (req, res) => {
  const user_log_details = req.body;
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
      res.status(400).send({success:false,msg:"Check Email / Password"})
    }
  } else {
    res.json({ status: "User does not exist." });
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

module.exports = router;
