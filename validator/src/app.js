const express = require("express");
require("./db/mongoose");
require("./db/redis");
const validatorRouter = require("./routers/validator");

const app = express();

app.use(express.json());
app.use(validatorRouter);

module.exports = app;
