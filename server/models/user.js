const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  ava: {
    type: String,
    required: false,
    default: null
  },
  socialType: {
    type: String,
    required: false,
    default: null,
  },
  socialId: {
    type: Number,
    require: false,
    default: 0
  }
});

const User = mongoose.model("User", UserSchema);

module.exports = { User }; 