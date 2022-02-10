const port = process.env.VAL_PORT;

const express = require("express");
require("../src/db/mongoose");
require("../src/db/redis");
const validatorRouter = require("./validator");

const app = express();

app.use(express.json());
app.use(validatorRouter);

app.listen(port, () => {
  console.log("server is up on port" + port);
});
