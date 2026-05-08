import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  const [user, setUser] = useState(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const loggedInUser = localStorage.getItem('blog_user');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    localStorage.setItem('blog_user', JSON.stringify(userData));
    setCurrentPage('home');
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('blog_user');
    setCurrentPage('home');
  };

  const renderPage = () => {
    if (currentPage === 'login' && !user) return <Login onLogin={handleLogin} onNavigate={setCurrentPage} />;
    if (currentPage === 'register' && !user) return <Register onLogin={handleLogin} onNavigate={setCurrentPage} />;
    return <Home user={user} />;
  };

  return (
    <div className="app-wrapper">
      <Navbar user={user} onLogout={handleLogout} onNavigate={setCurrentPage} />
      <main className="container">
        {renderPage()}
      </main>
    </div>
  );
}

export default App;
