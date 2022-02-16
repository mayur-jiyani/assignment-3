const express = require("express");
require("./db/mongoose");
require("./db/redis");
const validatorRouter = require("./routers/validator");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swagger = require("../swagger.json");

const app = express();

// const specs = swaggerJsDoc(swagger);
app.use("/validator/api-docs", swaggerUI.serve, swaggerUI.setup(swagger));

app.use(express.json());
app.use(validatorRouter);

module.exports = app;
