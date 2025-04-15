import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";  // Default import
import Reports from "./pages/Reports";  // Default import
import Admin from "./pages/Admin";  // Default import
import Users from "./pages/Users";  // Default import
import './App.css';


function App() {
  return (
    <Router>
      <Navbar />
      <div style={{ padding: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/users" element={<Users />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
