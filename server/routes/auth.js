const router = require('express').Router();
const User = require('../models/User');
const CryptoJS = require('crypto-jS');
const jwt = require('jsonwebtoken');
// register
router.post('/register', async (req, res) => {
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    // password: req.body.password,
    password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
  });

  try {
    const savedUser = await newUser.save();
    // console.log(savedUser);
    res.status(201).json(savedUser);
  } catch (err) {
    // console.log(errer)
    res.status(500).json(err);
  }
});

// log in

router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    !user && res.status(401).json('it is wrong username');

    const hashedpassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);
    const Password = hashedpassword.toString(CryptoJS.env.utf8);
    Password !== req.body.password && res.status(401).json('it is wrong password!!!');

    const accessToken = jwt.sign(
      {
        id: user._id,
        isAdmin: user.isAdmin,
      },
      process.env.JWT_SEC,
      { expiresIn: '60d' },
    );

    const { password, ...others } = user._doc;

    res.status(200).json({ ...others, accessToken });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
