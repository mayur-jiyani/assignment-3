const express = require("express");
const router = new express.Router();
const auth = require("../src/middleware/auth");
const amqp = require("amqplib");
const Message = require("../src/model/messages");
const axios = require("axios");
const User = require("../src/model/users");
const { v4: uuidv4 } = require("uuid");

router.get("/validator/consumer", auth, async (req, res) => {
  try {
    const amqpServer = "amqp://localhost:5672";
    const connection = await amqp.connect(amqpServer);
    const channel = await connection.createChannel();
    var QUEUE = "qweq";
    await channel.assertQueue(QUEUE);

    channel.consume(
      QUEUE,
      async (message) => {
        const input = JSON.parse(message.content.toString());

        const trackerdata = {
          user_message: input.message,
        };

        //get token from input.id
        const user = await User.findById(input.user_id);
        const token = user.tokens[0].token;

        //set options for axios
        const options = {
          method: "POST",
          url: "http://127.0.0.1:3003/tracker/messages",
          data: [trackerdata],
          headers: {
            Authorization: `Bearer ${token}`,
            correlation_id: uuidv4(),
          },
        };

        async function checkNum() {
          if (input.randomNumber % 10 == 0) {
            trackerdata.category = "Retried";

            await setTimeout(async () => {
              const randomNumber = Math.floor(Math.random() * 60 + 1);

              if (randomNumber % 10 == 0) {
                trackerdata.category = "Failed";
              }
            }, 4000);

            // Call Data tracker
            await axios(options);

            return;
          } else {
            input.category = "Direct";
            // Call Data tracker
            axios(options);
          }
        }
        checkNum();

        // channel.ack(input);
      },
      { noAck: true }
    );

    console.log("Waiting for messages...");
  } catch (ex) {
    res.status(500).send(ex);
  }
});

module.exports = router;
