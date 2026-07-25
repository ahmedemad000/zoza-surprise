import { useMemo } from 'react';
import { motion } from 'framer-motion';

function Heart({ size, color }) {
  return (
    <svg viewBox="0 0 32 29" width={size} height={size * 0.9}>
      <path
        d="M16 29S1 19.5 1 9.8C1 3.9 5.4 0 10.2 0c2.7 0 5 1.3 5.8 3.4C16.8 1.3 19.1 0 21.8 0 26.6 0 31 3.9 31 9.8 31 19.5 16 29 16 29Z"
        fill={color}
      />
    </svg>
  );
}

function Petal({ color }) {
  return (
    <svg viewBox="0 0 32 32" width="100%" height="100%">
      <path
        d="M16 2C20 8 28 10 28 17C28 24 22 30 16 30C10 30 4 24 4 17C4 10 12 8 16 2Z"
        fill={color}
      />
    </svg>
  );
}

function Sparkle({ size, color }) {
  return (
    <svg viewBox="0 0 20 20" width={size} height={size}>
      <path d="M10 0 L12 8 L20 10 L12 12 L10 20 L8 12 L0 10 L8 8 Z" fill={color} />
    </svg>
  );
}

function FloatingItem({ delay, duration, left, size, rotate, opacity, kind, color }) {
  return (
    <motion.div
      style={{ position: 'absolute', left: `${left}%`, top: '-8%', width: size, height: size }}
      initial={{ y: '-10vh', opacity: 0, rotate: 0 }}
      animate={{
        y: '112vh',
        opacity: [0, opacity, opacity, 0],
        rotate,
        x: [0, 16, -12, 8, 0],
      }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    >
      {kind === 'heart' && <Heart size={size} color={color} />}
      {kind === 'petal' && <Petal color={color} />}
      {kind === 'sparkle' && <Sparkle size={size} color={color} />}
    </motion.div>
  );
}

export default function Ambient({ count = 16, theme = 'light' }) {
  const palette =
    theme === 'dark'
      ? ['var(--color-gold-300)', 'var(--color-rose-300)', '#f3e6c9']
      : ['var(--color-rose-400)', 'var(--color-gold-400)', 'var(--color-rose-300)'];

  const kinds = ['heart', 'petal', 'sparkle'];

  const items = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        delay: Math.random() * 10,
        duration: 16 + Math.random() * 12,
        left: Math.random() * 100,
        size: 10 + Math.random() * 16,
        rotate: 180 + Math.random() * 360,
        opacity: 0.2 + Math.random() * 0.35,
        kind: kinds[i % kinds.length],
        color: palette[i % palette.length],
      })),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [count, theme]
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      {items.map((it) => (
        <FloatingItem key={it.id} {...it} />
      ))}
    </div>
  );
}
