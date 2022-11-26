const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const currentUser = new Schema({
  _id: {
    type: String,
    required: true,
  },
  currentUserLogin: {
    type: String,
    required: true,
  },
});

const CurrentUser = mongoose.model("CurrentUser", currentUser);
module.exports = CurrentUser;
