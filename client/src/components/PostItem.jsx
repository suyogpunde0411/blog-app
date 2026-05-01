import React from 'react';

function PostItem({ post, onEdit, onDelete }) {
  // Format the date nicely
  const formattedDate = new Date(post.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <div className="post-card">
      <div className="post-header">
        <h2 className="post-title">{post.title}</h2>
      </div>
      <div className="post-meta">
        By <strong>{post.author}</strong> on {formattedDate}
      </div>
      <div className="post-content">
        {post.content}
      </div>
      <div className="post-actions">
        <button className="btn" onClick={() => onEdit(post)}>Edit</button>
        <button className="btn btn-danger" onClick={() => onDelete(post._id)}>Delete</button>
      </div>
    </div>
  );
}

export default PostItem;
