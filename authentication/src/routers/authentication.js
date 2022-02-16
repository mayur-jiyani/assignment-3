const express = require("express");
const User = require("../model/users");
const router = new express.Router();
const client = require("../db/redis");
const auth = require("../middleware/auth");
const logger = require("../logger");
const jwt = require("jsonwebtoken");

router.post("/authentication/users", async (req, res) => {
  const user = await new User(req.body);

  try {
    if (!(user.password.length >= 6 && user.password.length <= 12)) {
      logger.warn("password should be between 6 to 12 characters long");
      return res.send("password should be between 6 to 12 characters long");
    }

    const dbUser = await user.save();

    const userKey = "user_" + dbUser.username;

    await client.json.set(userKey, ".", {
      id: dbUser._id,
      username: dbUser.username,
      password: dbUser.password,
      requestCounter: 0,
    });

    const token = await user.generatAuthToken();
    return res.status(201).send({ user, token });
  } catch (e) {
    logger.error(e.toString());
    return res.status(400).send(e.toString());
  }
});

router.post("/authentication/users/login", async (req, res) => {
  try {
    const { redisUser, user } = await User.findByCredentials(
      req.body.username,
      req.body.password
    );

    const token = await user.generatAuthToken();
    // console.log(token);
    return res.status(200).send({ redisUser, token });
  } catch (e) {
    logger.error(e.toString());
    return res.status(400).send(e.toString());
  }
});

router.post("/authentication/users/logout", auth, async (req, res) => {
  try {
    return res.send("successfulluy logout");
  } catch (e) {
    logger.error(e.toString());
    return res.status(500).send(e.toString());
  }
});

router.post("/authentication/middleware", async (req, res) => {
  try {
    // if (req.headers.authorization == null) {
    //   console.log("1");
    // }
    // const token = req.header("Authorization").replace("Bearer ", "");
    // const token = req.headers["authorization"];
    // console.log("2");
    // console.log(req.body.token);
    const token = req.body.token;
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({ _id: decode._id });

    if (!user) {
      logger.error("user not found");
      throw new Error();
    }
    const myObj = { user, token };

    return res.send(myObj);
  } catch (e) {
    const myObj = " ";

    return res.send(myObj);
  }
});

module.exports = router;
