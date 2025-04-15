import React from 'react';

const Admin = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>As an admin, you have access to the following actions:</p>
      <ul>
        <li>View Crime Reports</li>
        <li>Manage Users</li>
        <li>Send Safety Alerts</li>
      </ul>
      <p>Choose an action to proceed.</p>
    </div>
  );
};

export default Admin;