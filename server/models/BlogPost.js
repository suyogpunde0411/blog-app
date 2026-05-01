const mongoose = require('mongoose');

// Define the schema for a blog post
const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: String,
    required: [true, 'Author name is required'],
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

// Create and export the model
module.exports = mongoose.model('BlogPost', blogPostSchema);
