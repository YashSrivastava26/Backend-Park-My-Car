const express = require("express");
const User = require("../../Models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateUser = require("./userVerification");
require("dotenv").config({ path: ".env.local" });

const JWT_SECRET = process.env.JWT_SECRET;

router.get("/getUser", validateUser, (req, res) => {
  const id = req.query.id;
  res.send(id);
});

router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    //user doesnt exist
    if (!user) {
      return res
        .status(400)
        .json({ error: { message: "Invalid Credentials" } });
    }

    //password check
    const passwordChk = await bcrypt.compare(password, user.password);

    if (!passwordChk) {
      return res
        .status(400)
        .json({ error: { message: "Invalid Credentials" } });
    }

    //jwt token
    const tokendata = {
      user: {
        id: user._id,
      },
    };
    const token = jwt.sign(tokendata, JWT_SECRET);
    res.json({ user: user, token: token });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ error: { message: "Internal Server Error" } });
  }
});

module.exports = router;
