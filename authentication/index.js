const port = process.env.AUTH_PORT;

const express = require("express");
require("../src/db/mongoose");
require("../src/db/redis");
const authenticationRouter = require("./authentication");

const app = express();

app.use(express.json());
app.use(authenticationRouter);

app.listen(port, () => {
  console.log("server is up on port" + port);
});
