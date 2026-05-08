const express = require('express');
const router = express.Router();
const BlogPost = require('../models/BlogPost');
const { protect } = require('../middleware/auth');

// GET all posts
router.get('/', async (req, res) => {
  try {
    const posts = await BlogPost.find()
      .populate('author', 'name')
      .populate('comments.user', 'name')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single post
router.get('/:id', async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
      .populate('author', 'name')
      .populate('comments.user', 'name');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new post
router.post('/', protect, async (req, res) => {
  const post = new BlogPost({
    title: req.body.title,
    author: req.user._id,
    content: req.body.content
  });

  try {
    const newPost = await post.save();
    const populatedPost = await newPost.populate('author', 'name');
    res.status(201).json(populatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PUT (update) an existing post
router.put('/:id', protect, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to edit this post' });
    }

    if (req.body.title) post.title = req.body.title;
    if (req.body.content) post.content = req.body.content;

    const updatedPost = await post.save();
    const populatedPost = await updatedPost.populate('author', 'name');
    res.json(populatedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a post
router.delete('/:id', protect, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    // Check ownership
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST like/unlike a post
router.post('/:id/like', protect, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.likes) post.likes = [];

    // Check if post has already been liked
    if (post.likes.filter(like => like.toString() === req.user._id.toString()).length > 0) {
      // Get remove index
      const removeIndex = post.likes.map(like => like.toString()).indexOf(req.user._id.toString());
      post.likes.splice(removeIndex, 1);
    } else {
      post.likes.unshift(req.user._id);
    }

    await post.save();
    res.json(post.likes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST add comment
router.post('/:id/comment', protect, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    if (!post.comments) post.comments = [];

    const newComment = {
      text: req.body.text,
      user: req.user._id
    };

    post.comments.unshift(newComment);
    await post.save();
    
    // Return populated post so the frontend can display the commenter's name
    const populatedPost = await post.populate('comments.user', 'name');
    res.json(populatedPost.comments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
