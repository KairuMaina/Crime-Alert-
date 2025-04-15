import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [alerts, setAlerts] = useState([]);
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is logged in from localStorage
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('adminLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    // Check if the entered password matches (you can change 'admin123' to your desired password)
    if (password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true'); // Store login status
    } else {
      alert('Incorrect password');
    }
  };

  // Fetch alerts for the admin dashboard
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('/api/alerts');
        const data = await response.json();
        setAlerts(data); // Setting the alerts to be displayed
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    if (isLoggedIn) {
      fetchAlerts();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Admin Login</h2>
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      <div className="admin-actions">
        <h2>Admin Actions</h2>
        <ul>
          <li>View Crime Reports</li>
          <li>Manage Users</li>
          <li>Send Safety Alerts</li>
        </ul>
      </div>

      {alerts.length > 0 && (
        <div className="alerts-section">
          <h2>Government Alerts</h2>
          {alerts.map((alert, index) => (
            <div key={index} className="alert-card">
              <strong>Government Alert:</strong> {alert.message}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
