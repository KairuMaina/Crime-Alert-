import React, { useState } from 'react';
import './Home.css';
import Footer from '../components/Footer';

const Home = ({ addReport }) => {
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    description: '',
    name: '',
    id: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (addReport) {
      addReport(formData);
      alert("Report submitted successfully!");
    } else {
      console.error("addReport function not provided");
    }

    // Clear form
    setFormData({
      title: '',
      location: '',
      date: '',
      description: '',
      name: '',
      id: ''
    });
  };

  return (
    <>
      <div className="home-container">
        <h1 className="home-title">Crime Reporting Portal</h1>
        <p className="home-subtitle">Help us keep your community safe. Report any incidents below.</p>

        <form className="report-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name:</label>
            <input type="text" name="name" value={formData.name} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>National ID / Identifier:</label>
            <input type="text" name="id" value={formData.id} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Title of Report:</label>
            <input type="text" name="title" value={formData.title} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Location:</label>
            <input type="text" name="location" value={formData.location} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Date:</label>
            <input type="date" name="date" value={formData.date} onChange={handleChange} required />
          </div>

          <div className="form-group">
            <label>Description:</label>
            <textarea name="description" value={formData.description} onChange={handleChange} rows="4" required />
          </div>

          <button className="submit-btn" type="submit">Submit Report</button>
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Home;
