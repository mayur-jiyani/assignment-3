const port = process.env.PUSH_PORT;

const express = require("express");
require("../src/db/mongoose");
require("../src/db/redis");
const pusherRouter = require("./pusher");

const app = express();

app.use(express.json());
app.use(pusherRouter);

app.listen(port, () => {
  console.log("server is up on port" + port);
});
