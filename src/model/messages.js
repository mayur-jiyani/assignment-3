const mongoose = require("mongoose");
const moment = require("moment");

const messageSchema = new mongoose.Schema({
  user_message: {
    type: String,
    trim: true,
    required: true,
  },
  category: {
    type: String,
    trim: true,
    default: "Direct",
  },
  created_time: {
    type: Date,
    default: moment(new Date()).format("YYYY-MM-DD HH:mm:ss"),
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
