import React, { useState, useRef, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Portfolio from './pages/Portfolio';
import Contact from './pages/Contact';
import PlanetPage from './pages/PlanetPage';
import Navbar from './components/Navbar';
import RedisGuide from './pages/RedisGuide';
import PythonConsole from './components/PythonConsole';
import './styles.css';

export default function App() {
  const [consoleOpen, setConsoleOpen] = useState(false);
  const [consoleHeight, setConsoleHeight] = useState(300);
  const resizerRef = useRef(null);
  const containerRef = useRef(null);
  const location = useLocation();
  const showPythonConsole = location.pathname !== '/redis'; // hide console on redis page

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (resizerRef.current && resizerRef.current.isResizing) {
        const newHeight = window.innerHeight - e.clientY;
        setConsoleHeight(Math.max(100, Math.min(newHeight, 600)));
      }
    };
    const handleMouseUp = () => {
      if (resizerRef.current) resizerRef.current.isResizing = false;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  const startResizing = () => {
    if (resizerRef.current) resizerRef.current.isResizing = true;
  };

  return (
    <div className="app-container">
      <Navbar />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/redis" element={<RedisGuide />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/planet/:name" element={<PlanetPage />} />
      </Routes>

      <button
        onClick={() => setConsoleOpen(!consoleOpen)}
        style={{
          position: 'fixed',
          bottom: consoleOpen ? `${consoleHeight}px` : '10px',
          left: 0,
          width: '100%',
          zIndex: 1000,
          background: 'linear-gradient(to right, #0f2027, #203a43, #2c5364)',
          color: '#00f6ff',
          border: 'none',
          borderRadius: 0,
          padding: '12px',
          fontSize: '16px',
          fontWeight: 'bold',
          fontFamily: 'Orbitron, sans-serif',
          textAlign: 'center',
          cursor: 'pointer',
          boxShadow: '0 0 20px #00f6ff22',
          borderBottom: '1px solid #00f6ff33',
          textShadow: '0 0 6px #00f6ff88',
        }}
      >
        {consoleOpen ? 'Close Python Console' : 'Open Python Console'}
      </button>

      <div
        ref={containerRef}
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '100%',
          height: consoleOpen ? `${consoleHeight}px` : '0',
          overflow: 'hidden',
          background: '#0f2027',
          borderTop: '2px solid #00f6ff',
          transition: 'height 0.3s ease-in-out',
          zIndex: 999,
          boxShadow: '0 0 20px #00f6ff22',
        }}
      >
        {consoleOpen && (
          <>
            <div
              ref={resizerRef}
              onMouseDown={startResizing}
              style={{
                height: '6px',
                cursor: 'ns-resize',
                background: '#00f6ff33',
                borderTop: '1px solid #00f6ff88',
              }}
            ></div>
            <div style={{ height: `calc(100% - 6px)`, overflow: 'auto', padding: '10px' }}>
              <PythonConsole />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
