const request = require("supertest");
const app = require("../app");

test("create message", async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBjODdhZTE1NGM3Zjk3ZmViZTFkNWEiLCJpYXQiOjE2NDQ5ODg0MzN9.BqdZGJuRwteIOR-UJlfZ81uW7bS_2HbGf3qkATbeoNI";
  const response = await request(app)
    .get("/tracker/messages")
    .set({ Authorization: `Bearer ${token}` })
    .send({
      messages: [
        {
          user_message: "hello not",
        },
        {
          user_message: "hello in",
        },
      ],
    })
    .expect(200);
});

test("retrieve message", async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBjODdhZTE1NGM3Zjk3ZmViZTFkNWEiLCJpYXQiOjE2NDQ5ODg0MzN9.BqdZGJuRwteIOR-UJlfZ81uW7bS_2HbGf3qkATbeoNI";
  const response = await request(app)
    .get("/tracker/messages")
    .set({ Authorization: `Bearer ${token}` })
    .send({
      text: "jiyani",
    })
    .expect(200);
});

test("retrieve message count", async () => {
  const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MjBjODdhZTE1NGM3Zjk3ZmViZTFkNWEiLCJpYXQiOjE2NDQ5ODg0MzN9.BqdZGJuRwteIOR-UJlfZ81uW7bS_2HbGf3qkATbeoNI";
  const response = await request(app)
    .get("/tracker/count_messages")
    .set({ Authorization: `Bearer ${token}` })
    .send({
      category: "Direct",
      created_time: "2022-02-15",
    })
    .expect(200);
});
