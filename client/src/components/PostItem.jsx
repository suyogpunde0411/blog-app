import React, { useState } from 'react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function PostItem({ post, onEdit, onDelete, user, refreshPosts }) {
  const [commentText, setCommentText] = useState('');

  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const isOwner = user && user._id === (post.author ? post.author._id : null);
  const hasLiked = user && post.likes && post.likes.includes(user._id);

  const handleLike = async () => {
    if (!user) return alert("Please log in to like posts.");
    try {
      await fetch(`${API_URL}/posts/${post._id}/like`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${user.token}` }
      });
      refreshPosts();
    } catch (err) {
      console.error(err);
    }
  };

  const handleComment = async (e) => {
    e.preventDefault();
    if (!user) return alert("Please log in to comment.");
    if (!commentText.trim()) return;

    try {
      await fetch(`${API_URL}/posts/${post._id}/comment`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.token}` 
        },
        body: JSON.stringify({ text: commentText })
      });
      setCommentText('');
      refreshPosts();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
        {isOwner && (
          <div className="post-actions-top">
            <button className="btn-icon" onClick={() => onEdit(post)}>✏️</button>
            <button className="btn-icon danger" onClick={() => onDelete(post._id)}>🗑️</button>
          </div>
        )}
      </div>
      <div className="post-meta">
        By <strong>{post.author ? post.author.name : 'Unknown User'}</strong> on {formattedDate}
      </div>
      <div className="post-content">
        {post.content}
      </div>
      
      <div className="post-interactions">
        <button 
          className={`like-btn ${hasLiked ? 'liked' : ''}`} 
          onClick={handleLike}
        >
          {hasLiked ? '❤️' : '🤍'} {post.likes ? post.likes.length : 0}
        </button>
      </div>

      <div className="comments-section">
        <h3>Comments ({post.comments ? post.comments.length : 0})</h3>
        {post.comments && post.comments.map((comment, index) => (
          <div key={index} className="comment">
            <strong>{comment.user ? comment.user.name : 'Unknown'}: </strong>
            <span>{comment.text}</span>
          </div>
        ))}
        
        {user && (
          <form className="comment-form" onSubmit={handleComment}>
            <input 
              type="text" 
              placeholder="Write a comment..." 
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
            />
            <button type="submit" className="btn btn-small">Post</button>
          </form>
        )}
      </div>
    </div>
  );
}

export default PostItem;
