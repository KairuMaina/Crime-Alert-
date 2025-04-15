import React, { useState, useEffect } from 'react';
import './Admin.css';

const Admin = () => {
  const [alerts, setAlerts] = useState([]);
  const [reports, setReports] = useState([]);
  const [newAlert, setNewAlert] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const storedLoginStatus = localStorage.getItem('adminLoggedIn');
    if (storedLoginStatus === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    if (password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('adminLoggedIn', 'true');
    } else {
      alert('Incorrect password');
    }
  };

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

  const handleSendAlert = async () => {
    try {
      const response = await fetch('/api/alerts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: newAlert }),
      });

      if (response.ok) {
        alert('Alert sent successfully');
        setNewAlert('');
        const updatedAlert = await response.json();
        setAlerts((prev) => [...prev, updatedAlert]);
      } else {
        alert('Failed to send alert');
      }
    } catch (error) {
      console.error('Error sending alert:', error);
    }
  };

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
          <li>Send Safety Alerts</li>
        </ul>
      </div>

      {/* Dashboard Summary Section */}
      <div className="dashboard-summary" style={{ textAlign: 'center', margin: '2rem 0' }}>
        <h2>System Summary</h2>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '1.5rem' }}>
          <div className="summary-card" style={{ padding: '1rem 2rem', background: '#e3f2fd', borderRadius: '8px' }}>
            <h3>Total Reports</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{reports.length}</p>
          </div>
          <div className="summary-card" style={{ padding: '1rem 2rem', background: '#ffe0b2', borderRadius: '8px' }}>
            <h3>Alerts Sent</h3>
            <p style={{ fontSize: '2rem', fontWeight: 'bold' }}>{alerts.length}</p>
          </div>
        </div>
      </div>

      {reports.length > 0 && (
        <div className="reports-section">
          <h2>Submitted Crime Reports</h2>
          {reports.map((report, index) => (
            <div key={index} className="report-card">
              <p><strong>Reporter:</strong> {report.reporter_name} (ID: {report.reporter_id})</p>
              <p><strong>Crime Type:</strong> {report.crime_type}</p>
              <p><strong>Description:</strong> {report.description}</p>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Date:</strong> {new Date(report.date_reported).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}

      <div className="alert-form">
        <h2>Send New Government Alert</h2>
        <textarea
          rows="3"
          placeholder="Type alert message here..."
          value={newAlert}
          onChange={(e) => setNewAlert(e.target.value)}
        />
        <button onClick={handleSendAlert}>Send Alert</button>
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
