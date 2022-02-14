const app = require("./app");
const port = process.env.TRACK_PORT;
const logger = require("./logger");

app.listen(port, () => {
  logger.info("server is up on port" + port);
});
