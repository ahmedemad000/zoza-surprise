import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';

// Drop your track at public/music.mp3 (any royalty-free or your own file).
// If the file is missing, the button simply does nothing harmful.
export default function MusicPlayer({ start }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [ready, setReady] = useState(true);

  useEffect(() => {
    if (!start || !audioRef.current) return;
    audioRef.current.volume = 0.55;
    const p = audioRef.current.play();
    if (p && p.then) {
      p.then(() => setPlaying(true)).catch(() => setReady(false));
    }
  }, [start]);

  const toggle = () => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.pause();
      setPlaying(false);
    } else {
      audioRef.current.play().then(() => setPlaying(true)).catch(() => setReady(false));
    }
  };

  if (!start) return null;

  return (
    <>
      <audio ref={audioRef} src="music.mp3" loop preload="auto" />
      {ready && (
        <motion.button
          type="button"
          onClick={toggle}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          aria-label={playing ? 'Pause music' : 'Play music'}
          className="focus-ring fixed bottom-5 right-5 z-40 flex h-11 w-11 items-center justify-center rounded-full shadow-[0_10px_25px_-8px_rgba(74,46,53,0.4)]"
          style={{ background: 'linear-gradient(160deg, var(--color-blush-100), var(--color-blush-200))', border: '1px solid rgba(176,136,65,0.35)' }}
        >
          {playing ? (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <motion.rect x="3" y="2" width="3" height="12" rx="1" fill="var(--color-rose-500)" animate={{ scaleY: [1, 0.6, 1] }} transition={{ duration: 1, repeat: Infinity }} />
              <motion.rect x="10" y="2" width="3" height="12" rx="1" fill="var(--color-rose-500)" animate={{ scaleY: [0.6, 1, 0.6] }} transition={{ duration: 1, repeat: Infinity }} />
            </svg>
          ) : (
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M4 2.5v11l10-5.5-10-5.5Z" fill="var(--color-rose-500)" />
            </svg>
          )}
        </motion.button>
      )}
    </>
  );
}
