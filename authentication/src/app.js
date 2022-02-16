const express = require("express");

const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swagger = require("../swagger.json");

require("./db/mongoose");
require("./db/redis");

const authenticationRouter = require("./routers/authentication");

const app = express();

// const specs = swaggerJsDoc(swagger);
app.use("/authentication/api-docs", swaggerUI.serve, swaggerUI.setup(swagger));

app.use(express.json());
app.use(authenticationRouter);

module.exports = app;
