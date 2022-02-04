const mongoose = require("mongoose");
const moment = require("moment");

const messageSchema = new mongoose.Schema({
  user_message: {
    type: String,
    trim: true,
    required: true,
  },
  request_count: {
    type: Number,
    default: 0,
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
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
