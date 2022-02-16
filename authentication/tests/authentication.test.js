const request = require("supertest");
const app = require("../src/app");
const User = require("../src/model/users");
// const { response } = require("../src/app");
// const { userOneId, userOne, setupDatabase } = require("./fixtures/db");

// beforeEach(setupDatabase);

test("Should signup a new user", async () => {
  const response = await request(app)
    .post("/authentication/users")
    .send({
      username: "ujllkj",
      password: "ujllkj",
    })
    .expect(201);
}, 30000);

test("Should login existing user", async () => {
  const response = await request(app)
    .post("/authentication/users/login")
    .send({
      username: "ujllkj",
      password: "ujllkj",
    })
    .expect(200);
}, 300000);

test("Should not login nonexistent user", async () => {
  await request(app)
    .post("/authentication/users/login")
    .send({
      username: "popopop",
      password: "ggghbjhbjbjb",
    })
    .expect(400);
});
