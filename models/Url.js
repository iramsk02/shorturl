const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    required: true,
  },
  shortUrl: {
    type: String,
    required: true,
    unique: true,  // Ensure shortUrl is unique
  },
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;
