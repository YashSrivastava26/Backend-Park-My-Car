const jwt_decode = require("jwt-decode");

const validateUser = (req, res, next) => {
  try {
    const token = req.headers.authorization.split("Bearer ")[1];
    const userDetails = jwt_decode(token);
    console.log(userDetails);
    const userId = userDetails.user.id;
    req.body.userId = userId;
    req.query.userId = userId;
    next();
  } catch (err) {
    res.status(400).send({ error: { message: "Invalid Credentials" } });
  }
};
module.exports = validateUser;
