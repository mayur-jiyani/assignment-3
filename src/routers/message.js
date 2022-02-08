const express = require("express");
const Message = require("../model/messages");
const router = new express.Router();
const auth = require("../middleware/auth");
const amqp = require("amqplib");

router.post("/tracker/messages", auth, (req, res) => {
  const arr = req.body;

  arr.forEach(async (item) => {
    const message = new Message({
      ...item,
      user_id: req.user._id,
    });

    try {
      await message.save();
      // const token = await message.generatAuthToken();
    } catch (e) {
      return res.status(400).send(e);
    }
  });
  return res.status(201).send(arr);
});

router.get("/tracker/messages", auth, async (req, res) => {
  const text = req.body.text;

  try {
    const arr = await Message.find({}, { user_message: 1, _id: 0 });
    const result = [];

    arr.filter((element) => {
      if (element.user_message.includes(text)) {
        result.push(element.user_message);
      }
    });

    return res.status(200).send(result);
  } catch (e) {
    return res.status(500).send();
  }
});

router.get("/tracker/count_messages", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["category", "created_time"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid keys!" });
  }

  try {
    const count = await Message.countDocuments({
      category: req.body.category,
      created_time: req.body.created_time,
    });

    return res.status(200).send({ "number of messages": count });
  } catch (e) {
    return res.status(500).send({ error: "no record found" });
  }
});

router.post("/pusher/publisher", auth, async (req, res) => {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();

    var QUEUE = "pushh";
    await channel.assertQueue(QUEUE);

    const randomNumber = Math.floor(Math.random() * 60 + 1);

    const msg = { ...req.body, user_id: req.user._id };
    await channel.sendToQueue(QUEUE, Buffer.from(JSON.stringify(msg)));
    res.status(200).send(`Job sent successfully ${msg}`);
    await channel.close();
    await connection.close();
    return;
  } catch (ex) {
    return res.status(500).send(ex);
  }
});

router.get("/pusher/consumer", auth, async (req, res) => {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    var QUEUE = "pushh";
    await channel.assertQueue(QUEUE);

    channel.consume(QUEUE, (message) => {
      const input = JSON.parse(message.content.toString());
      QUEUE = "";
      return res.status(200).send(`Recieved job with input ${input}`);
      //"7" == 7 true
      //"7" === 7 false

      // if (input.number == 7) channel.ack(message);
    });

    console.log("Waiting for messages...");
  } catch (ex) {
    return res.status(500).send(ex);
  }
});

module.exports = router;
