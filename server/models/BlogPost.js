const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  content: {
    type: String,
    required: [true, 'Post content is required'],
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  comments: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  }],
}, { timestamps: true });

module.exports = mongoose.model('BlogPost', blogPostSchema);
