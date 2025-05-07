// src/components/InfoPanel.js
import React from 'react';
import './InfoPanel.css';

export default function InfoPanel({ name, link, onClose }) {
  return (
    <div className="info-panel">
      <div className="info-header">
        <strong>{name}</strong>
        <button className="close-button" onClick={onClose}>✖</button>
      </div>
      <p className="info-link" onClick={(e) => {
        e.stopPropagation(); // prevent background clicks
        window.location.href = link;
      }}>
        Learn more →
      </p>
    </div>
  );
}