import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Reports from './pages/Reports';
import Admin from './pages/Admin';
import Users from './pages/Users';
import Navbar from './components/Navbar';

const App = () => {
  const [reports, setReports] = useState([]);

  const addReport = (newReport) => {
    setReports((prevReports) => [...prevReports, newReport]);
  };

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home addReport={addReport} />} />
        <Route path="/reports" element={<Reports reports={reports} />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
};

export default App;
