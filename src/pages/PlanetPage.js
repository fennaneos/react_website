import React from 'react';
import { useParams } from 'react-router-dom';
import './PlanetPage.css';

export default function PlanetPage() {
  const { name } = useParams();
  return (
    <div className={`planet-page planet-${name}`}>
      <div className="planet-panel">
        <h1>{name.charAt(0).toUpperCase() + name.slice(1)}</h1>
        <p>This is the {name} page. More information will come soon.</p>
      </div>
    </div>
  );
}