const mongoose = require("mongoose");
const { FilmSchema } = require('./films');
const { TvSchema } = require('./tv');

const CelebritySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  img: {
    type: String,
    required: false,
    default: null
  },
  bio: {
    type: String,
    required: false
  },
  link: {
    type: String,
    required: false
  },
  films: [ FilmSchema ],
  tv: [ TvSchema ]
});

const Celebrity = mongoose.model("Celebrity", CelebritySchema);

module.exports = { Celebrity }; 