const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/model/users");
const Message = require("../../src/model/messages");

const userOneId = new mongoose.Types.ObjectId();
const userOne = {
  _id: userOneId,
  username: "SDDSDS",
  password: "DSDSDSD",
};

const setupDatabase = async () => {
  await User.deleteMany();
  await new User(userOne).save();
};

module.exports = {
  userOneId,
  userOne,
  setupDatabase,
};
