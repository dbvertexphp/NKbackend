const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  imageType: {
    type: String,
    enum: ['hero', 'background', 'project'],  // Only allow 'hero' or 'background' types
    required: true
  },
  filename: {
    type: String,
    required: true
  },
  filepath: {
    type: String,
    required: true
  },
  fileSize: {
    type: Number,
    required: true
  },
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

const Image = mongoose.model('Image', imageSchema);

module.exports = Image;
