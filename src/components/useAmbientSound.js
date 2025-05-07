// useAmbientSound.js
import { useEffect, useRef } from 'react';

export default function useAmbientSound(src) {
  const audioRef = useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(src);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src]);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.warn('Playback failed:', err);
      });
    }
  };

  const pause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  return { play, pause };
}
