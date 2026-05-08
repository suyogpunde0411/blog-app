import React, { useState, useEffect } from 'react';
import PostList from '../components/PostList';
import PostForm from '../components/PostForm';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function Home({ user }) {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch(`${API_URL}/posts`);
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const handleSavePost = async (postData) => {
    try {
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.token}`
      };

      if (editingPost) {
        await fetch(`${API_URL}/posts/${editingPost._id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(postData),
        });
        setEditingPost(null);
      } else {
        await fetch(`${API_URL}/posts`, {
          method: 'POST',
          headers,
          body: JSON.stringify(postData),
        });
      }
      fetchPosts();
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await fetch(`${API_URL}/posts/${id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${user.token}` }
        });
        fetchPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  return (
    <>
      <header>
        <h1>My Cloud Computing Blog</h1>
        <p>A full-stack application with authentication and social features</p>
      </header>

      {user ? (
        <PostForm 
          onSave={handleSavePost} 
          editingPost={editingPost} 
          onCancel={handleCancelEdit} 
        />
      ) : (
        <div className="login-prompt">
          <p>Please log in to create a post, like, or comment.</p>
        </div>
      )}
      
      <PostList 
        posts={posts} 
        onEdit={handleEditClick} 
        onDelete={handleDeletePost}
        user={user}
        refreshPosts={fetchPosts}
      />
    </>
  );
}

export default Home;
