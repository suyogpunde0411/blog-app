import React, { useState, useEffect } from 'react';

function PostForm({ onSave, editingPost, onCancel }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (editingPost) {
      setTitle(editingPost.title);
      setContent(editingPost.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [editingPost]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !content) {
      alert('Please fill out all fields');
      return;
    }
    
    // Author is now handled by the backend using JWT
    onSave({ title, content });
    
    if (!editingPost) {
      setTitle('');
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
