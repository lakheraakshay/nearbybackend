const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
// const mongoUri = dotenv.parsed.mongoUri;
const url = process.env.mongoose_url;
const db = mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected successfull");
  })

  .catch((error) => {
    // console.log(url);
    console.log("********************************", error);
  });
