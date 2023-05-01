const express = require("express");
const User = require("../../Models/User");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const validateUser = require("./userVerification");
require("dotenv").config({ path: ".env.local" });
const { validationSchema } = require("../../helpers/validationSchema");

const JWT_SECRET = process.env.JWT_SECRET;

router.get("/getUser", validateUser, async (req, res) => {
  const id = req.query.userId;
  try {
    const user = await User.findOne({ _id: id });
    res.send({ user: user });
  } catch (error) {
    res.status(500).json({ error: { message: "Internal Server Error" } });
  }
});

router.post("/login", async (req, res) => {
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

router.post("/signup", async (req, res) => {
  try {
    //validation
    const { value, error } = validationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.details[0] });
    }

    //checking if email already exist
    let user = await User.findOne({ email: value.email });

    if (user) {
      return res
        .status(400)
        .json({ error: { message: "user with email already exists" } });
    }

    //password hashing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(value.password, salt);

    user = await User.create({
      name: value.name,
      email: value.email,
      password: passwordHash,
    });

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
      .json({ error: { message: "Internal server error" } });
  }
});

module.exports = router;
