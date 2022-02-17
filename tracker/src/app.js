const express = require("express");
require("./db/mongoose");
require("./db/redis");
const trackerRouter = require("./routers/tracker");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swagger = require("../swagger.json");

const app = express();

//for swagger ui
// const specs = swaggerJsDoc(swagger);
app.use("/tracker/api-docs", swaggerUI.serve, swaggerUI.setup(swagger));

app.use(express.json());
app.use(trackerRouter);

module.exports = app;
