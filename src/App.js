import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import PlanetPage from './pages/PlanetPage';
import Navbar from './components/Navbar';
import './styles.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/planet/:name" element={<PlanetPage />} />
      </Routes>
    </Router>
  );
}
