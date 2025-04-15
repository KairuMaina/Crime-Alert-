// src/components/Navbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Create this CSS file for styles

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-brand">Crime Alert</div>
      <ul className="navbar-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/reports">Reports</Link></li>
        <li><Link to="/admin">Admin</Link></li>
        <li><Link to="/users">Users</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
