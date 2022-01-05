const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const USER = require("../Schema/AuthSchema");

router.get("/with_requests", async (req, res) => {
  const user = await USER.find().populate({ path: "get_request" }).populate({path:"send_request"});
  res.status(200).send({ success: true, user });
});
router.get("/all",async(req,res)=>{
  try{
    const user = await USER.find()
    res.status(200).send({ success: true, user });
  }catch(e){console.log(e)}
})

module.exports = router;
