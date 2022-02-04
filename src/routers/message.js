const express = require("express");
const Message = require("../model/messages");
const router = new express.Router();

router.post("/tracker/messages", (req, res) => {
  const arr = req.body;

  arr.forEach(async (item) => {
    const message = new Message(item);

    try {
      await message.save();
      // const token = await message.generatAuthToken();
    } catch (e) {
      res.status(400).send(e);
    }
  });
  res.status(201).send(arr);
});

router.get("/tracker/messages", async (req, res) => {
  const text = req.body.text;

  try {
    const arr = await Message.find({}, { user_message: 1, _id: 0 });
    const result = [];

    arr.filter((element) => {
      if (element.user_message.includes(text)) {
        result.push(element.user_message);
      }
    });

    res.status(200).send(result);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/tracker/count_messages", async (req, res) => {
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

    res.status(200).send({ "number of messages": count });
  } catch (e) {
    res.status(500).send({ error: "no record found" });
  }
});

module.exports = router;
