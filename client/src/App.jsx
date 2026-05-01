import React, { useState, useEffect } from 'react';
import PostList from './components/PostList';
import PostForm from './components/PostForm';

// Determine the base URL for APIs. It defaults to the Vite proxy or absolute URL
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

function App() {
  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

  // Fetch posts on initial load
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
      if (editingPost) {
        // Update existing post
        await fetch(`${API_URL}/posts/${editingPost._id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });
        setEditingPost(null);
      } else {
        // Create new post
        await fetch(`${API_URL}/posts`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(postData),
        });
      }
      fetchPosts(); // Refresh list after save
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await fetch(`${API_URL}/posts/${id}`, {
          method: 'DELETE',
        });
        fetchPosts(); // Refresh list after delete
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  const handleEditClick = (post) => {
    setEditingPost(post);
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll up to form
  };

  const handleCancelEdit = () => {
    setEditingPost(null);
  };

  return (
    <div className="container">
      <header>
        <h1>My Cloud Computing Blog</h1>
        <p>A simple full-stack application built for deployment</p>
      </header>

      <main>
        <PostForm 
          onSave={handleSavePost} 
          editingPost={editingPost} 
          onCancel={handleCancelEdit} 
        />
        
        <PostList 
          posts={posts} 
          onEdit={handleEditClick} 
          onDelete={handleDeletePost} 
        />
      </main>
    </div>
  );
}

export default App;
