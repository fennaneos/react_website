import React from 'react';
import './SidePanel.css';

export default function SidePanel({ position, items }) {
  return (
    <div className={`side-panel ${position}-panel`}>
      <ul>
        {items.map((item, index) => (
          <li key={index} onClick={item.onClick}>
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
