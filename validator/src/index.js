const app = require("./app");
const port = process.env.VAL_PORT;
const logger = require("./logger");

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  logger.info("server is up on port" + port);
});
