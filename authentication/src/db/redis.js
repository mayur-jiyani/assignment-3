const { createClient } = require("redis");
const logger = require("../logger");

const client = createClient({
  url: process.env.REDIS_URL,
});

client.on("error", (err) => {
  logger.error("Redis Client Error", err);
});

client.connect();

module.exports = client;
