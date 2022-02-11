const express = require("express");
require("./db/mongoose");
require("./db/redis");
const pusherRouter = require("./routers/pusher");

const app = express();

app.use(express.json());
app.use(pusherRouter);

module.exports = app;
