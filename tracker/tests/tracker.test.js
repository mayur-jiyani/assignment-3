const request = require("supertest");
const app = require("../src/app");

test("Should create message", async (req, res) => {
  const token = req.header("Authorization").replace("Bearer ", "");
  const response = await request(app)
    .post("/tracker/messages")
    .set("Authorization", `Bearer ${token}`)
    .send([
      {
        message: "mkmkmkm",
      },
      {
        message: "mkmkmkm",
      },
    ])
    .expect(201);
});

// test("Should retrieve tasks", async () => {
//   const response = await request(app)
//     .get("/tasks")
//     .set("Authorization", `Bearer ${userOne.tokens[0].token}`)
//     .send()
//     .expect(200);

//   expect(response.body.length).toEqual(2);
// });
