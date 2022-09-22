const router = require("express").Router();

console.log("test")
router.get("/usertest", (req, res) => {
 res.send("usertest is successful");

});


// router.post("/userposttest", (req, res) =>{
    // const username =req.body.username;
    // console.log(username);
    // res.send("your username is : " + username)
// })


module.exports = router