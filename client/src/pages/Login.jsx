import React, { useState } from 'react';

function Login({ onLogin, onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Login failed');
      
      onLogin(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="form-card auth-card">
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-primary" style={{width: '100%'}}>Login</button>
        <p className="auth-switch">
          Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>Register</a>
        </p>
      </form>
    </div>
  );
}

export default Login;
