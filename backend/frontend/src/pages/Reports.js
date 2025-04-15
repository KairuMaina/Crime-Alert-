import React from 'react';
import './Reports.css';

const Reports = ({ reports = [] }) => {
  return (
    <div className="reports-container">
      <h1 className="reports-title">Submitted Crime Reports</h1>
      {reports.length === 0 ? (
        <p className="no-reports">No reports submitted yet.</p>
      ) : (
        <div className="report-list">
          {reports.map((report, index) => (
            <div key={index} className="report-card">
              <h2>{report.title}</h2>
              <p><strong>Location:</strong> {report.location}</p>
              <p><strong>Date:</strong> {report.date}</p>
              <p><strong>Description:</strong> {report.description}</p>
              <p><strong>Reported By:</strong> {report.name} (ID: {report.id})</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reports;
