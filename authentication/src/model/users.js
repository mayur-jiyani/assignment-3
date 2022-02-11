const mongoose = require("mongoose");
// const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const client = require("../db/redis");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    trim: true,
    required: true,
    validate(value) {
      var myRegxp = /^([a-zA-Z0-9_-]){5,15}$/;
      if (!myRegxp.test(value)) {
        throw new Error(
          "Username should be between 5 to 15 characters long and only alphanumeric is allowed"
        );
      }
    },
  },

  password: {
    type: String,
    required: true,
    trim: true,
  },
});

userSchema.virtual("messages", {
  ref: "Message",
  localField: "_id",
  foreignField: "user_id",
});

userSchema.methods.generatAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);
  return token;
};

userSchema.statics.findByCredentials = async (username, password) => {
  const userKey = "user_" + username;
  const redisUser = await client.json.get(userKey);

  if (!redisUser) {
    throw new Error("Unable to login");
  }

  const isMatch = await bcrypt.compare(password, redisUser.password);

  if (!isMatch) {
    throw new Error("Unable to login");
  }

  const user = await User.findById(redisUser.id);

  return { redisUser, user };
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
