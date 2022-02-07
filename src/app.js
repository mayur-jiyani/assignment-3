const express = require("express");
require("./db/mongoose");
require("./db/redis");
const messageRouter = require("./routers/message");
const userRouter = require("./routers/user");

const app = express();

app.use(express.json());
app.use(messageRouter);
app.use(userRouter);

module.exports = app;
