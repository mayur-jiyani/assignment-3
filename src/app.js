const express = require("express");
require("./db/mongoose");
const messageRouter = require("./routers/message");

const app = express();

app.use(express.json());
app.use(messageRouter);

module.exports = app;
