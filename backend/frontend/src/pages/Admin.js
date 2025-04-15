import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [alerts, setAlerts] = useState([]);
  const [reports, setReports] = useState([]);
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [storedUsername, setStoredUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check login status and stored username
  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('adminLoggedIn');
    const savedUser = localStorage.getItem('adminUsername');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
      setStoredUsername(savedUser);
    }
  }, []);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsLoggedIn(true);
      setStoredUsername(username);
      localStorage.setItem('adminLoggedIn', 'true');
      localStorage.setItem('adminUsername', username);
    } else {
      alert('Incorrect password');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setPassword('');
    setUsername('');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUsername');
  };

  // Fetch government alerts
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('/api/alerts');
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error('Error fetching alerts:', error);
      }
    };

    if (isLoggedIn) {
      fetchAlerts();
    }
  }, [isLoggedIn]);

  // Fetch crime reports submitted from Home page
  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await fetch('/api/reports');
        const data = await response.json();
        setReports(data);
      } catch (error) {
        console.error('Error fetching reports:', error);
      }
    };

    if (isLoggedIn) {
      fetchReports();
    }
  }, [isLoggedIn]);

  if (!isLoggedIn) {
    return (
      <div className="login-container">
        <h2>Admin Login</h2>
        <input
          type="text"
          placeholder="Enter Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
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
      <div className="admin-header">
        <h1>Welcome, {storedUsername}</h1>
        <button className="signout-button" onClick={handleLogout}>Sign Out</button>
      </div>

      <div className="admin-actions">
        <h2>Admin Actions</h2>
        <ul>
          <li>View Crime Reports</li>
          <li>Manage Users</li>
          <li>Send Safety Alerts</li>
        </ul>
      </div>

      {/* Government Alerts */}
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

      {/* Submitted Reports */}
      {reports.length > 0 && (
        <div className="reports-section">
          <h2>Submitted Crime Reports</h2>
          {reports.map((report, index) => (
            <div key={index} className="report-card">
              <p><strong>Reporter:</strong> {report.reporter_name} (ID: {report.reporter_id})</p>
              <p><strong>Type:</strong> {report.crime_type}</p>
              <p><strong>Description:</strong> {report.description}</p>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Date:</strong> {new Date(report.date_reported).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Admin;
