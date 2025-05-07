// React core and hooks
import React, { useRef, useState, useEffect } from 'react';

// Drei utility components for Three.js scenes
import { Stars, OrbitControls, Html } from '@react-three/drei';

// Fiber hooks for animation and scene interaction
import { useFrame, useThree } from '@react-three/fiber';

// Main Three.js library
import * as THREE from 'three';

// React Router for navigation
import { useNavigate } from 'react-router-dom';

// Spring animation libraries
import { a, useSpring } from '@react-spring/three';  // For animating 3D elements
import { useSpring as useHtmlSpring, animated as aHtml } from '@react-spring/web'; // For animating HTML overlays

// Sound files
import hoverSoundFile from '../assets/sounds/hover.mp3';
import clickSoundFile from '../assets/sounds/click.mp3';
import ambientSoundFile from '../assets/sounds/space-ambient.mp3';

// Optional CSS for visuals
import './GalaxyScene.css';


function Planet({ name, texture, position, size, orbitRadius, orbitSpeed }) {
  const ref = useRef();                          // Ref to control the planet mesh
  const angle = useRef(0);                       // Internal angle for orbiting logic
  const [hovered, setHovered] = useState(false); // Tracks whether the planet is hovered
  const [showPanel, setShowPanel] = useState(false); // Controls display of info panel
  const navigate = useNavigate();                // Hook for navigation
  const [planetPos, setPlanetPos] = useState(position); // Planet's current position in orbit

  const hoverSound = useRef(null); // Sound to play on hover
  const clickSound = useRef(null); // Sound to play on click

  // Initialize audio files on mount
  useEffect(() => {
    hoverSound.current = new Audio(hoverSoundFile);
    clickSound.current = new Audio(clickSoundFile);
    hoverSound.current.volume = 0.3;
    clickSound.current.volume = 0.5;
  }, []);

  // Animate orbiting and rotation
  useFrame(() => {
    angle.current += orbitSpeed;
    const x = Math.cos(angle.current) * orbitRadius;
    const z = Math.sin(angle.current) * orbitRadius;

    // Update mesh position
    if (ref.current) {
      ref.current.position.set(x, 0, z);
      ref.current.rotation.y += 0.0005;
    }

    // Keep track of updated position for the floating HTML panel
    setPlanetPos([x, 0, z]);
  });

  // Animation for glowing effect when hovered
  const { emissiveIntensity } = useSpring({
    emissiveIntensity: hovered ? 0.15 : 0,
    config: { mass: 1, tension: 180, friction: 18 },
  });

  // Animation for the floating HTML info panel
  const htmlSpringStyles = useHtmlSpring({
    opacity: showPanel ? 1 : 0,
    transform: showPanel ? 'scale(1)' : 'scale(0.8)',
    config: { tension: 170, friction: 26 },
  });

  // Event handlers
  const handlePointerOver = () => {
    setHovered(true);
    document.body.style.cursor = 'pointer';
    hoverSound.current?.play().catch(() => {});
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'default';
  };

  const handleClick = () => {
    clickSound.current?.play().catch(() => {});
    setShowPanel((prev) => !prev); // Toggle panel
  };

  // 🌌 Render the planet and its orbit
  return (
    <group>
      <a.mesh
        ref={ref}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        onClick={handleClick}
      >
        <sphereGeometry args={[size, 64, 64]} />
        <a.meshStandardMaterial
          map={texture}
          emissive={new THREE.Color('white')}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={1}
        />
      </a.mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[orbitRadius - 0.05, orbitRadius + 0.05, 128]} />
        <meshBasicMaterial
          color={hovered ? '#66ccff' : '#888'}
          side={THREE.DoubleSide}
          transparent
          opacity={0.3}
        />
      </mesh>

      {showPanel && (
        <Html position={[planetPos[0] + size + 2, 0, planetPos[2]]}>
          <aHtml.div
            style={{
              ...htmlSpringStyles,
              background: 'rgba(10, 10, 30, 0.9)',
              border: '1px solid #33f',
              padding: '12px 18px',
              borderRadius: '12px',
              color: '#fff',
              fontSize: '14px',
              fontFamily: 'Orbitron, sans-serif',
              transformOrigin: 'left top',
              boxShadow: '0 0 30px rgba(0, 200, 255, 0.5)',
              backdropFilter: 'blur(12px)',
              minWidth: '200px',
              pointerEvents: 'auto',
            }}
          >
            <div style={{ fontWeight: 'bold', fontSize: '16px', marginBottom: '8px' }}>{name}</div>
            <div
              style={{ cursor: 'pointer', textDecoration: 'underline', color: '#8ef' }}
              onClick={() => navigate(`/planet/${name.toLowerCase()}`)}
            >
              View details →
            </div>
          </aHtml.div>
        </Html>
      )}
    </group>
  );
}

// 🌒 Moon Component
// Represents a moon orbiting around a planet.
function Moon({ texture, planetPos, distance, size, speed }) {
  const ref = useRef();
  const angle = useRef(0);

  useFrame(() => {
    angle.current += speed;
    const x = planetPos[0] + Math.cos(angle.current) * distance;
    const z = planetPos[2] + Math.sin(angle.current) * distance;
    if (ref.current) {
      ref.current.position.set(x, 0, z);
      ref.current.rotation.y += 0.001;
    }
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

// 🌌 GalaxyScene Component
// Sets up the whole solar system scene.

export default function GalaxyScene({ ambientAudioRef }) {
  const loader = new THREE.TextureLoader();

  const sun = loader.load('/textures/sun.jpg');
  const earth = loader.load('/textures/earth.jpg');
  const mars = loader.load('/textures/mars.jpg');
  const moon = loader.load('/textures/moon.jpg');
  const milkyway = loader.load('/textures/milkyway.jpg');

  const { camera } = useThree();
  const initial = useRef(true);

  // // Ambient audio: play on mount
  useEffect(() => {
    if (!ambientAudioRef || !ambientAudioRef.current) {
      const audio = new Audio(ambientSoundFile);
      audio.loop = true;
      audio.volume = 0.2;
      audio.play().catch((err) => console.warn('Ambient audio failed to play:', err));
      if (ambientAudioRef) ambientAudioRef.current = audio;
    }
  }, [ambientAudioRef]);

  // // Intro camera zoom animation
  useFrame(({ clock }) => {
    if (initial.current) {
      const t = clock.getElapsedTime();
      if (t < 3) {
        camera.position.z = 300 - t * 50;
        camera.lookAt(0, 0, 0);
      } else {
        initial.current = false;
      }
    }
  });
  // 🌠 Render the solar system
  return (
    <>
      {/* Milky Way background sphere */}
      <primitive
        object={new THREE.Mesh(
          new THREE.SphereGeometry(500, 64, 64),
          new THREE.MeshBasicMaterial({ map: milkyway, side: THREE.BackSide })
        )}
      />

      {/* Scene lighting */}
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={3} />

      {/* Starfield */}
      <Stars radius={300} depth={60} count={20000} factor={7} fade speed={2} />

      {/* The Sun */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[10, 64, 64]} />
        <meshStandardMaterial map={sun} emissive={new THREE.Color('orange')} emissiveIntensity={1.2} />
      </mesh>

      {/* Planets and Moon */}
      <Planet name="Earth" texture={earth} position={[30, 0, 0]} size={5} orbitRadius={30} orbitSpeed={0.0025} />
      <Planet name="Mars" texture={mars} position={[50, 0, 0]} size={4} orbitRadius={50} orbitSpeed={0.0018} />
      <Moon texture={moon} planetPos={[30, 0, 0]} distance={7} size={1.2} speed={0.01} />

      {/* Camera controls */}
      <OrbitControls />
    </>
  );
}

