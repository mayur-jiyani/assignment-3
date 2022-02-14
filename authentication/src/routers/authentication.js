const express = require("express");
const User = require("../model/users");
const router = new express.Router();
const client = require("../db/redis");
const auth = require("../middleware/auth");
const logger = require("../logger");

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

module.exports = router;
