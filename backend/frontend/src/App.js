import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import Users from './pages/Users';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // ✅ import footer

const App = () => {
  const [reports, setReports] = useState([]);

  const addReport = (newReport) => {
    setReports((prevReports) => [...prevReports, newReport]);
  };

  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home addReport={addReport} />} />
            <Route path="/reports" element={<Reports reports={reports} />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/users" element={<Users />} />
          </Routes>
        </div>
        <Footer /> {/* ✅ include the footer below all routes */}
      </div>
    </Router>
  );
};

export default App;
