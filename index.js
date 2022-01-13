const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
require("./Connection");
dotenv.config();

var cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "20mb" }));

app.use(function (req, res, next) {
  console.log(req._parsedUrl.path, "----<<<<<<<<<<<Current ");
  res.setHeader("Acces-Control-Allow-Origin", "*");
  res.setHeader("Acces-Control-Allow-Methods", "GET,POST,PUT,PATCH,DELETE");
  res.setHeader("Acces-Contorl-Allow-Methods", "Content-Type", "Authorization");
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PUT, PATCH, DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use("/auth", require("./Routes/Auth_Routes"));
app.use("/user", require("./Routes/User_Routes"));
app.use("/request", require("./Routes/Request_Routes"));
app.use("/location", require("./Routes/Location_Routes"));

app.listen(process.env.PORT || 5001, () => {
  console.log("Port is running on 5000");
});
