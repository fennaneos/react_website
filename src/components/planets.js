import clickSoundFile from '../assets/sounds/click.mp3';
import hoverSoundFile from '../assets/sounds/hover.mp3';

const planets = [
  {
    name: 'Mercury',
    size: 0.5,
    distance: 5,
    orbitSpeed: 0.3,
    rotationSpeed: 1,
    color: '#aaaaaa',
    link: '/mercury',
    clickSound: new Audio(clickSoundFile),
    hoverSound: new Audio(hoverSoundFile),
  },
  {
    name: 'Venus',
    size: 0.9,
    distance: 7,
    orbitSpeed: 0.2,
    rotationSpeed: 0.8,
    color: '#d4af37',
    link: '/venus',
    clickSound: new Audio(clickSoundFile),
    hoverSound: new Audio(hoverSoundFile),
  },
  {
    name: 'Earth',
    size: 1,
    distance: 10,
    orbitSpeed: 0.15,
    rotationSpeed: 1,
    color: '#2a9df4',
    link: '/earth',
    clickSound: new Audio(clickSoundFile),
    hoverSound: new Audio(hoverSoundFile),
  },
  {
    name: 'Mars',
    size: 0.8,
    distance: 13,
    orbitSpeed: 0.12,
    rotationSpeed: 1.05,
    color: '#b22222',
    link: '/mars',
    clickSound: new Audio(clickSoundFile),
    hoverSound: new Audio(hoverSoundFile),
  },
];

export default planets;
