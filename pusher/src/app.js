const express = require("express");
require("./db/mongoose");
require("./db/redis");
const pusherRouter = require("./routers/pusher");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swagger = require("../swagger.json");

const app = express();

// const specs = swaggerJsDoc(swagger);
app.use("/pusher/api-docs", swaggerUI.serve, swaggerUI.setup(swagger));

app.use(express.json());
app.use(pusherRouter);

module.exports = app;
