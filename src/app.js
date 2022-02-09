const express = require("express");
require("./db/mongoose");
require("./db/redis");
const authenticationRouter = require("./routers/authentication");
const pusherRouter = require("./routers/pusher");
const trackerRouter = require("./routers/tracker");
const validatorRouter = require("./routers/validator");

const app = express();

app.use(express.json());
app.use(authenticationRouter);
app.use(pusherRouter);
app.use(trackerRouter);
app.use(validatorRouter);

module.exports = app;
