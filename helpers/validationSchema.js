const Joi = require("joi");

const validationSchema = Joi.object({
  name: Joi.string().min(3).max(40).required(),

  email: Joi.string().email().required(),

  password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).required(),

  repeat_password: Joi.ref("password")

});


module.exports = { validationSchema };