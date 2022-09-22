const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userRoute = require("./routes/users");

const router = require("express").Router();
dotenv.config();

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Db connection sucssessful"))
  .catch((errer) => {
    console.log(errer);
  });

// create our end point
app.use(express.json());
// app.use("/api/users", userRoute);
router.use("/api/users", userRoute);
// app.use("/api/v1",require("./routes/api"));

// app.get("/api/test", () =>{
//     console.log("test is successful");
// });

app.listen(process.env.PORT || 4000, () => {
  console.log("Backend server is running");
});
