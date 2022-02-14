const jwt = require("jsonwebtoken");
const User = require("../model/users");
const logger = require("../logger");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decode._id });

    if (!user) {
      logger.error("user not found");
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    logger.error("Please authenticate");
    res.status(401).send({ error: "Please authenticate" });
  }
};

module.exports = auth;
