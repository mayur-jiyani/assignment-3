const express = require("express");
require("./db/mongoose");
require("./db/redis");
const trackerRouter = require("./routers/tracker");

const app = express();

app.use(express.json());
app.use(trackerRouter);

module.exports = app;
