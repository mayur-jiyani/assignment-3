const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const amqp = require("amqplib");
const client = require("../db/redis");
const logger = require("../logger");

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

    const arr = req.body.messages;
    arr.forEach(async (item) => {
      const msg = {
        message: item.message,
        randomNumber: Math.floor(Math.random() * 60 + 1),
        user_id: req.user._id,
        token: req.token,
      };
      await channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)));
    });

    await channel.close();
    await connection.close();
    return res.status(200).send("sent successfully");
  } catch (ex) {
    logger.error(ex.toString());
    res.status(500).send(ex);
  }
});

module.exports = router;
