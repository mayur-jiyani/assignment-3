const express = require("express");
const User = require("../model/users");
const router = new express.Router();
const client = require("../db/redis");

router.post("/authentication/users", async (req, res) => {
  const user = await new User(req.body);

  try {
    if (!(user.password.length >= 6 && user.password.length <= 12)) {
      return res.send("password should be between 6 to 12 characters long");
    }

<<<<<<< HEAD
    await user.save();
=======
    const dbUser = await user.save();
    const userKey = 'user_' + dbUser.username

    const response = await client.json.set(userKey, '.', { id: dbUser._id, username: dbUser.username, password: dbUser.password });
>>>>>>> master

    const token = await user.generatAuthToken();

    // const response = await client.set(user.usrename, token);

    // res.status(201).send({ username: user.username, token });

<<<<<<< HEAD
    await client.json.set(user.usrename, ".", {
      name: "Roberta McDonald",
      address: {
        number: 99,
        street: "Main Street",
        city: "Springfield",
        state: "OH",
        country: "USA",
      },
    });
=======
    // await client.json.set(user.usrename, ".", {
    //   name: "Roberta McDonald",
    //   address: {
    //     number: 99,
    //     street: "Main Street",
    //     city: "Springfield",
    //     state: "OH",
    //     country: "USA",
    //   },
    // });

    res.send(response);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

router.get("/authentication/users", async (req, res) => {
  const user = await new User(req.body);

  try {
    const response = await client.get(user.usrename);
>>>>>>> master

    res.send(response);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

<<<<<<< HEAD
router.get("/authentication/users", async (req, res) => {
  const user = await new User(req.body);

  try {
    const response = await client.get(user.usrename);

    res.send(response);
  } catch (e) {
    res.status(400).send(e.toString());
  }
});

=======
>>>>>>> master
module.exports = router;
