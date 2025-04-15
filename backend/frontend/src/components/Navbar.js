import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav style={{ backgroundColor: '#333', padding: '1rem' }}>
      <ul style={{ listStyle: 'none', display: 'flex', justifyContent: 'space-around', color: '#fff' }}>
        <li><Link to="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link></li>
        <li><Link to="/reports" style={{ color: '#fff', textDecoration: 'none' }}>Reports</Link></li>
        <li><Link to="/admin" style={{ color: '#fff', textDecoration: 'none' }}>Admin</Link></li>
        <li><Link to="/users" style={{ color: '#fff', textDecoration: 'none' }}>Users</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;
