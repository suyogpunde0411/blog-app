import React from 'react';
import PostItem from './PostItem';

function PostList({ posts, onEdit, onDelete }) {
  if (posts.length === 0) {
    return <p>No blog posts found. Create one above!</p>;
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem 
          key={post._id} 
          post={post} 
          onEdit={onEdit} 
          onDelete={onDelete} 
        />
      ))}
    </div>
  );
}

export default PostList;
