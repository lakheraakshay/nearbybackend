const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");
const res = require("express/lib/response");
const USER_AUTH = require("../Schema/AuthSchema");
const { LONG } = require("mysql/lib/protocol/constants/types");

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
router.get("/all/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const user = await USER.find({ _id: { $ne: id } });
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
      res
        .status(200)
        .send({ success: true, msg: `All ${gender} USERS`, users });
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
router.get("/filter/:gender/:from/:to", async (req, res) => {
  try {
    const { gender, to, from } = req.params;
    if (gender == "ALL") {
      const users = await USER.find({ age: { $gt: from, $lt: to } });
      res.status(200).send({ success: true, users });
    } else {
      const users = await USER.find({ gender, age: { $gt: from, $lt: to } });
      res.status(200).send({ success: true, users });
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
      .populate({ path: "send_request" })
      .populate({ path: "accepted_request" });

    res
      .status(200)
      .send({ success: true, msg: "Successfully fetched details", user });
  } catch (e) {
    console.log(e);
  }
});
// router.get("/")
router.patch("/edit/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const update = await USER.findByIdAndUpdate(
      id,
      { ...req.body },
      { new: true }
    );
    res.status(200).send({ success: true, update });
  } catch (e) {
    console.log(e);
  }
});

router.get("/location/:id/:lon/:lat/:quantity", async (req, res) => {
  const { lon, lat, id, quantity } = req.params;
  const fl_lon = parseFloat(lon);
  const fl_lat = parseFloat(lat);
  console.log(fl_lon, fl_lat, "\n\n\n<<<<<<<<<<<<<");
  const data = await USER.aggregate([
    {
      $geoNear: {
        near: { type: "Point", coordinates: [fl_lon, fl_lat] },
        distanceField: "dist.calculated",
        //  maxDistance: 1000,
        includeLocs: "dist.location",
        spherical: true,
      },
    },
    { $limit: quantity },
  ]);
  res.status(200).send({ data });
});

// router.get("/location/:id/:lon/:lat", async (req, res) => {
// const options = {
//   location_3: {
//     $near: {
//       // $centerSphere: [[79.961582, 23.233623], 15 / 3963.2],
//       $centerSphere: [[40, 40], 15 / 3963.2],
//     },
//   },
// };
// const data = await USER.find(options);
// const { lon, lat, id } = req.params;
// const fl_lon = parseFloat(lon);
// const fl_lat = parseFloat(lat);
// console.log(fl_lon, fl_lat, "\n\n\n<<<<<<<<<<<<<");
// const data = await USER.aggregate([
// {
// location_3: {
// $near: {
//   $geometry: { type: "Point", coordinates: [lon, lat] },
//   // distanceField: "dist.calculated",
//   // spherical: true
// }, //long,lat

// ---------
// $geoNear: {
//   near: { type: "Point", coordinates: [lon, lat] },
//   distanceField: "dist.calculated",
//   // maxDistance: 2,
//   query: { category: "GeoJSON" },
//   includeLocs: "dist.location",
//   spherical: true,
// },

// USER.aggregate([
// {
//   $geoNear: {
//     near: { type: "Point", coordinates: [fl_lon, fl_lat] },
//     distanceField: "dist.calculated",
//     //  maxDistance: ,
//     includeLocs: "dist.location",
//     spherical: true,
//   },
// },
// { $limit: 20 },
// ]);

// },
// ]);
// res.status(200).send({ data });
// });

router.get("/check_request/:curr_user_id/:other_user_id", async (req, res) => {
  try {
    const { curr_user_id, other_user_id } = req.params;
    const users = await USER.findById(curr_user_id);
    const status = {};
    const checkSentButPending = users.send_request.find(
      (id) => id == other_user_id
    );
    res.status(200).send({ success: true, checkSentButPending, users });
    console.log(users);
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
