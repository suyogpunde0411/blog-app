import React from 'react';
import PostItem from './PostItem';

function PostList({ posts, onEdit, onDelete, user, refreshPosts }) {
  if (posts.length === 0) {
    return <p className="empty-state">No blog posts found. Be the first to create one!</p>;
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostItem 
          key={post._id} 
          post={post} 
          onEdit={onEdit} 
          onDelete={onDelete} 
          user={user}
          refreshPosts={refreshPosts}
        />
      ))}
    </div>
  );
}

export default PostList;
