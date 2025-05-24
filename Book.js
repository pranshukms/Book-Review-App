const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  coverImage: {
    type: String,
    default: 'default-cover.jpg'
  },
  genre: {
    type: [String],
    required: true
  },
  publishedYear: {
    type: Number,
    required: true
  },
  averageRating: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  isFeatured: {
    type: Boolean,
    default: false
  },
  timestamps:{
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('Book', bookSchema);