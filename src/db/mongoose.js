const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1/my_database", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});