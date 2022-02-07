// const redis = require("redis");
// const rejson = require("redis-rejson");

// let client = redis.createClient();
// async function redisJSONDemo() {
//   try {
//     const TEST_KEY = "test_node";
//     rejson(redis);
//     await client.connect();

//     // RedisJSON uses JSON Path syntax. '.' is the root.
//     await client.json_set(TEST_KEY, ".", { node: 4303 });
//     const value = await client.json_get(TEST_KEY, {
//       // JSON Path: .node = the element called 'node' at root level.
//       path: ".node",
//     });

//     console.log(`value of node: ${value}`);

//     await client.quit();
//   } catch (e) {
//     console.error(e);
//   }
// }

// redisJSONDemo();

const { createClient } = require("redis");

(async () => {
  const client = createClient();

  client.on("error", (err) => console.log("Redis Client Error", err));

  await client.connect();

  await client.set("key", "value");
  const value = await client.get("key");
})();
