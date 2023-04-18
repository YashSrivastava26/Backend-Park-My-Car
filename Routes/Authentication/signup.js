const express = require("express");
const User = require("../../Models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require('dotenv').config({ path: '.env.local' });
const { validationSchema } = require("../../helpers/validationSchema");

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", async (req, res) => {
  try {
    //validation
    const { value, error } = validationSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ "error" : error.details[0] });
    }
    
    //checking if email already exist
    let user = await User.findOne({ email : value.email});

    if(user){
        return res.status(400).json({ "error" : { "message" : "user with email already exists"} });
    }


    //password hashing
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(value.password, salt);

    user = await User.create({
        name: value.name,
        email: value.email,
        password: passwordHash
    })

    //jwt token
    const tokendata = {
        user:{
            id: user._id
        }
    }
    const token = jwt.sign(tokendata, JWT_SECRET);
    res.json({token});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ "error" : { "message": "Internal server error" } });
  }
});

module.exports = router;
