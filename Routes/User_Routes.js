const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const USER=require("../Schema/AuthSchema")



module.exports=router