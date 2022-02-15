const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const amqp = require("amqplib");
const Message = require("../model/messages");
const axios = require("axios");
const User = require("../model/users");
const { v4: uuidv4 } = require("uuid");
const PromiseTimers = require("promise-timers");
const logger = require("../logger");

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

        //set options for axios
        const options = {
          method: "POST",
          url: "http://127.0.0.1:3003/tracker/messages",
          data: { messages: [trackerdata] },
          headers: {
            Authorization: `Bearer ${input.token}`,
            correlation_id: uuidv4(),
          },
        };

        // let check = new Promise(function (Resolve, Reject) {
        //   if (30 % 10 == 0) {
        //     trackerdata.category = "Retried";

        //     setTimeout(() => {
        //       const randomNumber = Math.floor(Math.random() * 60 + 1);

        //       if (20 % 10 == 0) {
        //         trackerdata.category = "Failed";
        //         // console.log(trackerdata.category);
        //       }
        //     }, 4000);

        //     Resolve(options);

        //     // Call Data tracker
        //     // await axios(options);

        //     // return;
        //   } else {
        //     trackerdata.category = "Direct";
        //     // Call Data tracker
        //     // axios(options);
        //     Resolve(options);
        //   }
        // });
        // check.then(function (value) {
        //   console.log(value);
        //   axios(value);
        // });

        async function check() {
          if (input.randomNumber % 10 == 0) {
            trackerdata.category = "Retried";

            await PromiseTimers.setTimeout(4000).then(() => {
              const randomNumber = Math.floor(Math.random() * 60 + 1);

              if (randomNumber % 10 == 0) {
                trackerdata.category = "Failed";
                // console.log(trackerdata.category);
              }
            });
          } else {
            trackerdata.category = "Direct";
          }
        }
        await check();
        // console.log(options);
        await axios(options);

        // channel.ack(input);
      },
      { noAck: true }
    );

    logger.info("Waiting for messages...");
  } catch (ex) {
    logger.error(ex.toString());
    res.status(500).send(ex);
  }
});

module.exports = router;
