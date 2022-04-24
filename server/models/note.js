const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  day: {
    type: Number,
    require: true
  },
  month: {
    type: String,
    required: true,
  },
  year: {
    type: Number,
    require: true
  },
  text: {
    type: String,
    required: true,
  },
  userId: {
    type: Number,
    require: true
  },
  id: {
    type: Number,
    require: true
  }
});

const Note = mongoose.model("Note", NoteSchema);

module.exports = { Note }; 