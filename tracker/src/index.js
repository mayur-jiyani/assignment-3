const app = require("./app");
const port = process.env.TRACK_PORT;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log("server is up on port" + port);
});
