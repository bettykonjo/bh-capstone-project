const router = require("express").Router();

// Creating a get request
router.route("/usertest").get((req, res) => {
  res.send("usertest is successful");
});

// Creating a POST request
router.post("/userposttest", (req, res) =>{
    const username = req.body.username;
    console.log(username);
    res.send("your username is : " + username)
})


module.exports = router;
