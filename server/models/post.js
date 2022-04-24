const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  userAva: {
    type: String,
    required: false,
    default: null
  },
  img: {
    type: String,
    required: false,
    default: null
  },
  text: {
    type: String,
    required: false,
    default: '',
  },
  id: {
    type: Number,
    require: true
  }
});

const Post = mongoose.model("Post", PostSchema);

module.exports = { Post }; 