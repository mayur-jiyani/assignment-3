const request = require("supertest");
const app = require("../src/app");

test("Should publish message", async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBhNDYzZjQwN2VmODE0MWEzYWJhYWIiLCJpYXQiOjE2NDQ4NDA1MTF9.SuHFnXhY_P55kOG6-edv8mDC0T2fB0-_pC4pcmq0kPo";
  await request(app)
    .post("/pusher/publisher")
    .set("Authorization", `Bearer ${token}`)
    .send([
      {
        message: "qwqwqqw",
      },
      {
        message: "qwqwqqw",
      },
    ])
    .expect(200);
});
