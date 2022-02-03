const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_message: {
      type: String,
      trim: true,
      required: true,
    },
    request_count: {
      type: Number,
      default: 0,
    },
    created_time: {
      type: Date,
      default: Date.now,
    },
  }
  //   {
  //     timestamps: { createdAt: true, updatedAt: false },
  //   }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
