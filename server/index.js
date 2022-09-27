const express = require("express");
const app =express();
const mongoose = require("mongoose")
const dotenv = require("dotenv");
const userRoute = require("./routes/user");

dotenv.config();

mongoose
.connect(
    process.env.MONGO_URL

    )
    .then(()=>console.log("Db connection sucssessful"))
    .catch((errer) =>{console.log(errer)});
    
    // create our end point
    app.use(express.json());
    app.use("/api/users", userRoute);

// app.get("/api/test", () =>{
//     console.log("test is successful");
// });


app.listen(process.env.PORT || 4000, () => {
    console.log("Backend server is running")
});