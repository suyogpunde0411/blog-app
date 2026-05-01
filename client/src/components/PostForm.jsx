import React, { useState, useEffect } from 'react';

function PostForm({ onSave, editingPost, onCancel }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');

  // If editingPost changes, populate the form
  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setAuthor(editingPost.author);
      setContent(editingPost.content);
    } else {
      // Reset form
      setTitle('');
      setAuthor('');
      setContent('');
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author || !content) {
      alert('Please fill out all fields');
      return;
    }
    
    onSave({ title, author, content });
    
    // Clear form after save if it's a new post
    if (!editingPost) {
      setTitle('');
      setAuthor('');
      setContent('');
    }
  };

  return (
    <div className="form-card">
      <h2>{editingPost ? 'Edit Post' : 'Create New Post'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            placeholder="Enter post title"
          />
        </div>
        <div className="form-group">
          <label>Author</label>
          <input 
            type="text" 
            value={author} 
            onChange={(e) => setAuthor(e.target.value)} 
            placeholder="Your name"
          />
        </div>
        <div className="form-group">
          <label>Content</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            placeholder="Write your blog post here..."
          ></textarea>
        </div>
        <button type="submit" className="btn">
          {editingPost ? 'Update Post' : 'Publish Post'}
        </button>
        {editingPost && (
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
}

export default PostForm;
