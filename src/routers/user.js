const express = require("express");
const User = require("../model/users");
const router = new express.Router();

router.post("/users", async (req, res) => {
  const user = new User(req.body);

  try {
    await my_database.insertMany(req.body);
    // await user.save();
    // const token = await user.generatAuthToken();
    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }

  // user.save().then(() => {
  //     res.status(201).send(user)
  // }).catch((e) => {
  //     res.status(400).send(e)
  // })
});

module.exports = router;
