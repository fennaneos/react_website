import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar futuristic-glow">
      <div className="nav-container">
        <div className="nav-logo">🚀 SpaceHub</div>
        <div className="nav-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Dashboard</Link>
          <Link to="/portfolio" className={location.pathname === '/portfolio' ? 'active' : ''}>Portfolio</Link>
          <Link to="/contact" className={location.pathname === '/contact' ? 'active' : ''}>Contact</Link>
        </div>
      </div>
    </nav>
  );
}
