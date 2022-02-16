const express = require("express");
const Message = require("../model/messages");
const router = new express.Router();
const auth = require("../middleware/auth");
const logger = require("../logger");

router.post("/tracker/messages", auth, (req, res) => {
  const arr = req.body.messages;

  arr.forEach(async (item) => {
    const message = new Message({
      ...item,
      user_id: req.user._id,
      request_id: req.header("correlation_id"),
    });

    try {
      await message.save();
      // const token = await message.generatAuthToken();
    } catch (e) {
      logger.error(e.toString());
      return res.status(400).send(e);
    }
  });
  return res.status(201).send(arr);
});

router.get("/tracker/messages", auth, async (req, res) => {
  const text = req.query.text;

  try {
    const arr = await Message.find({}, { user_message: 1, _id: 0 });
    const result = [];

    arr.filter((element) => {
      if (element.user_message.includes(text)) {
        result.push(element.user_message);
      }
    });
    // console.log(text);

    return res.status(200).send(result);
  } catch (e) {
    logger.error(e.toString());
    return res.status(500).send();
  }
});

router.get("/tracker/count_messages", auth, async (req, res) => {
  const updates = Object.keys(req.query);

  const allowedUpdates = ["category", "created_time"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    logger.warn("Invalid keys!");
    return res.status(400).send({ error: "Invalid keys!" });
  }

  try {
    const category = req.query.category;
    const date = req.query.created_time;
    const fromDate = new Date(date);
    const toDate = new Date(fromDate.getTime() + 86400000);
    if (!category || !date) {
      logger.warn("category and date required.");
      return res.send({ message: "category and date required.", ok: false });
    }

    const message = await Message.find({
      category: category,
      created_time: { $gte: fromDate, $lt: toDate },
    }).count();
    if (message == 0) {
      logger.error("no data with this category and date");
      return res.send({
        message: "no data with this category and date",
        ok: true,
      });
    }
    // console.log("message: ", message)
    res.send({ message: message, ok: true });
  } catch (e) {
    logger.error("no data with this category and date");
    return res.status(500).send({ error: "no record found" });
  }
});

module.exports = router;
