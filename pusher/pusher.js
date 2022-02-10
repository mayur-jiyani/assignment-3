const express = require("express");
const router = new express.Router();
const auth = require("../src/middleware/auth");
const amqp = require("amqplib");
const client = require("../src/db/redis");

router.post("/pusher/publisher", auth, async (req, res) => {
  try {
    //increment thecounter in each request received from user
    const userKey = "user_" + req.user.username;
    await client.json.NUMINCRBY(userKey, ".requestCounter", 1);

    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();

    var QUEUE = "qweq";
    await channel.assertQueue(QUEUE);

    const randomNumber = Math.floor(Math.random() * 60 + 1);
    const msg = {
      message: req.body.msg,
      randomNumber: randomNumber,
      user_id: req.user._id,
    };

    await channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)));

    await channel.close();
    await connection.close();
    return res.status(200).send("sent successfully");
  } catch (ex) {
    res.status(500).send(ex);
  }
});

module.exports = router;
