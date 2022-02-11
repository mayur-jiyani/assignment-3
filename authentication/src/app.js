const express = require("express");
require("./db/mongoose");
require("./db/redis");
const authenticationRouter = require("./routers/authentication");

const app = express();

app.use(express.json());
app.use(authenticationRouter);

module.exports = app;
