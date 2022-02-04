const express = require("express");
const User = require("../model/users");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();

    const token = await user.generatAuthToken();
    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});
