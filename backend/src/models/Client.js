const mongoose = require('mongoose');

const clientSchema = new mongoose. Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  imagePublicId: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Client', clientSchema);