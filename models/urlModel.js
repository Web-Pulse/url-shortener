// models/urlModel.js
const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
  longUrl: String,
  shortUrl: String,
  createdAt: { type: Date, default: Date.now },
});

const Url = mongoose.model('Url', urlSchema);

module.exports = Url;