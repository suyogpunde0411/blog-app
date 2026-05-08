import React from 'react';

function Navbar({ user, onLogout, onNavigate }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <a href="#" className="navbar-brand" onClick={(e) => { e.preventDefault(); onNavigate('home'); }}>Cloud Blog</a>
        <ul className="navbar-nav">
          {user ? (
            <>
              <li className="nav-item welcome-text">Welcome, {user.name}</li>
              <li className="nav-item">
                <button className="btn btn-danger nav-btn" onClick={onLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigate('login'); }}>Login</a>
              </li>
              <li className="nav-item">
                <a href="#" className="nav-link" onClick={(e) => { e.preventDefault(); onNavigate('register'); }}>Register</a>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
