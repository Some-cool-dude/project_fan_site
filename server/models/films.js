const mongoose = require("mongoose");

const FilmSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  credit: {
    type: String,
    required: true
  },
  year: {
    type: String,
    required: true
  }
});

module.exports = { FilmSchema }; 