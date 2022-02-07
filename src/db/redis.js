const redis = require("redis");

const client = redis.createClient(process.env.REDIS_URL);

client.connect();

client.on("connect", function () {
  console.log("Connected!");
});

module.exports = client;
