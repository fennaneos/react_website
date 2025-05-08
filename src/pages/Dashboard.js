import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Canvas } from '@react-three/fiber';
import GalaxyScene from '../components/GalaxyScene';
import SidePanel from '../components/SidePanel';
import useAmbientSound from '../components/useAmbientSound';
import ambientSoundFile from '../assets/sounds/space-ambient.mp3';
import './Dashboard.css';


const rightPanelItems = [
  { label: 'Settings', onClick: () => console.log('Settings clicked') },
  { label: 'Exit', onClick: () => console.log('Exit clicked') },
];

export default function Dashboard() {
  const { play } = useAmbientSound(ambientSoundFile);

  useEffect(() => {
    // Optionally, you can add a play button or start playback after a user interaction
    // For demonstration, we'll play after a short delay
    const timer = setTimeout(() => {
      play();
    }, 1000);

    return () => clearTimeout(timer);
  }, [play]);

  const navigate = useNavigate(); // Needed to navigate programmatically
  const leftPanelItems = [
    {
      label: 'Redis Guide',
      onClick: () => navigate('/redis')  // Navigates to Redis Guide page
    },
    {
      label: 'Navigation',
      onClick: () => console.log('Navigation clicked')
    }
  ];

  return (
    <div className="dashboard-container">
      <SidePanel position="left" items={leftPanelItems} />
      <Canvas camera={{ position: [0, 30, 130], fov: 60 }}>
        <GalaxyScene />
      </Canvas>
      <SidePanel position="right" items={rightPanelItems} />
    </div>
  );
}
