const port = process.env.TRACK_PORT;

const express = require("express");
require("../src/db/mongoose");
require("../src/db/redis");
const trackerRouter = require("./tracker");

const app = express();

app.use(express.json());
app.use(trackerRouter);

app.listen(port, () => {
  console.log("server is up on port" + port);
});
