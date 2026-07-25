import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Replace files in public/gallery/ and public/videos/ with real ones (same filenames),
// and edit the captions + type below. type: 'photo' | 'video'
const moments = [
  { type: 'photo', src: 'gallery/1.jpg', caption: 'that smile', rotate: -6 },
  { type: 'video', src: 'videos/1.mp4', poster: 'gallery/2.jpg', caption: 'that day out', rotate: 4 },
  { type: 'photo', src: 'gallery/3.jpg', caption: 'you, being you', rotate: -3 },
  { type: 'photo', src: 'gallery/4.jpg', caption: 'unforgettable', rotate: 5 },
  { type: 'video', src: 'videos/2.mp4', poster: 'gallery/5.jpg', caption: 'my favorite clip', rotate: -5 },
  { type: 'photo', src: 'gallery/6.jpg', caption: 'this moment', rotate: 3 },
  { type: 'photo', src: 'gallery/7.jpg', caption: 'golden hour', rotate: -4 },
  { type: 'photo', src: 'gallery/8.jpg', caption: 'always', rotate: 6 },
];

function PlayBadge() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 shadow-md backdrop-blur-sm">
        <svg width="14" height="14" viewBox="0 0 16 16">
          <path d="M4 2.5v11l10-5.5-10-5.5Z" fill="var(--color-rose-600)" />
        </svg>
      </div>
    </div>
  );
}

export default function MomentsGallery() {
  const [active, setActive] = useState(null);

  return (
    <section className="relative min-h-screen px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <span className="font-script text-4xl text-rose-500">Best moments</span>
        <p className="mx-auto mt-3 max-w-md font-serif text-lg italic text-wine-700/70">
          Small pieces of these two weeks, kept safe here — tap any of them.
        </p>
      </motion.div>

      <div className="mx-auto grid max-w-4xl grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 sm:gap-x-10">
        {moments.map((m, i) => (
          <motion.figure
            key={i}
            initial={{ opacity: 0, y: 30, rotate: 0 }}
            whileInView={{ opacity: 1, y: 0, rotate: m.rotate }}
            whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, delay: (i % 3) * 0.1 }}
            className="relative mx-auto w-full max-w-[220px] cursor-pointer rounded-sm bg-white p-3 pb-6 shadow-[0_18px_35px_-15px_rgba(74,36,54,0.35)]"
            onClick={() => setActive(m)}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-blush-100">
              <img
                src={m.type === 'video' ? m.poster : m.src}
                alt={m.caption}
                className="h-full w-full object-cover"
                loading="lazy"
              />
              {m.type === 'video' && <PlayBadge />}
            </div>
            <figcaption className="mt-3 text-center font-script text-xl text-wine-700/75">
              {m.caption}
            </figcaption>
          </motion.figure>
        ))}
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            className="fixed inset-0 z-40 flex items-center justify-center bg-wine-900/85 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative max-h-[85vh] max-w-md overflow-hidden rounded-md bg-black shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {active.type === 'video' ? (
                <video
                  src={active.src}
                  poster={active.poster}
                  controls
                  autoPlay
                  className="max-h-[85vh] w-full"
                />
              ) : (
                <img src={active.src} alt={active.caption} className="max-h-[85vh] w-full object-contain" />
              )}
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label="Close"
                className="focus-ring absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 text-wine-700"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
