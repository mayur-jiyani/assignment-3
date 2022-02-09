const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const amqp = require("amqplib");
const Message = require("../model/messages");
const axios = require("axios");

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
        // console.log(input.randomNumber);

        // const dbMessage = await Message.findOne({
        //   user_id: input.user_id,
        // });
        // console.log(dbMessage);

        const options = {
          method: "post",
          url: "/tracker/messages",
          //   data: [input],
          data: {
            firstName: "Finn",
            lastName: "Williams",
          },
        };

        async function checkNum() {
          if (60 % 10 == 0) {
            const check = await setTimeout(() => {
              //   const randomNumber = Math.floor(Math.random() * 60 + 1);

              if (60 % 10 == 0) {
                input.category = "Failed";

                // Call Data tracker
                console.log(axios(options));
                // dbMessage.save();
                // res.send("Failed");
                return true;
              }
            }, 4000);

            if (!check) {
              input.category = "Retried";
              // Call Data tracker
              axios(options);
              // dbMessage.save();
              //   res.send("Retried");
            }

            return;
          } else {
            input.category = "Direct";
            // Call Data tracker
            axios(options);
            // dbMessage.save();
            // res.send("Direct");
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
