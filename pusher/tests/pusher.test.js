const request = require("supertest");
const app = require("../src/app");

test("Should publish message", async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBjOTNmNjc5YTM4ZWE0MjI2NjdjYmIiLCJpYXQiOjE2NDQ5OTE0ODl9.x72yXDispxSVtT1_9kTfVcMNy4CiDqrC6BZsQa2oYjI";
  const res = await request(app)
    .post("/pusher/publisher")
    .set("Authorization", `Bearer ${token}`)
    .send({
      messages: [
        {
          message: "hello chirag",
        },
        {
          message: "jiyani",
        },
      ],
    })
    .expect(200);
});
