const mongoose = require("mongoose");

const GallerySchema = new mongoose.Schema({
  img: {
    type: String,
    required: true
  }
});

const Gallery = mongoose.model("Image", GallerySchema);

module.exports = { Gallery }; 