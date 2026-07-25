import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Envelope({ name, onOpen }) {
  const [stage, setStage] = useState('closed'); // closed -> cracking -> opening -> gone

  const handleClick = () => {
    if (stage !== 'closed') return;
    setStage('cracking');
    setTimeout(() => setStage('opening'), 550);
    setTimeout(() => {
      setStage('gone');
      onOpen();
    }, 1900);
  };

  return (
    <AnimatePresence>
      {stage !== 'gone' && (
        <motion.div
          className="night-glow fixed inset-0 z-50 flex flex-col items-center justify-center"
          exit={{ opacity: 0, transition: { duration: 0.7, ease: 'easeInOut' } }}
        >
          {/* soft twinkles */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            {Array.from({ length: 22 }).map((_, i) => (
              <motion.span
                key={i}
                className="absolute block h-[2px] w-[2px] rounded-full bg-gold-300"
                style={{ left: `${(i * 37) % 100}%`, top: `${(i * 53) % 100}%` }}
                animate={{ opacity: [0.15, 0.9, 0.15] }}
                transition={{ duration: 2 + (i % 5), repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </div>

          <motion.p
            className="relative mb-8 font-utility text-sm tracking-[0.3em] text-gold-300 uppercase"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: stage === 'closed' ? 1 : 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            A letter has arrived for you
          </motion.p>

          <motion.button
            type="button"
            onClick={handleClick}
            aria-label="Open the envelope to reveal your surprise"
            className="focus-ring relative h-[190px] w-[260px] cursor-pointer sm:h-[210px] sm:w-[290px]"
            animate={
              stage === 'closed'
                ? { y: [0, -8, 0] }
                : stage === 'opening'
                ? { y: -40, scale: 1.05, opacity: 0 }
                : {}
            }
            transition={
              stage === 'closed'
                ? { duration: 3, repeat: Infinity, ease: 'easeInOut' }
                : { duration: 0.9, ease: 'easeInOut' }
            }
          >
            <div className="absolute inset-0 rounded-sm shadow-[0_25px_60px_-15px_rgba(0,0,0,0.55)]" style={{ background: 'linear-gradient(180deg, #fff8f5, var(--color-blush-200))' }} />
            <div className="absolute inset-0 rounded-sm border border-gold-300/70" />

            <motion.div
              className="absolute left-1/2 top-2 h-[70%] w-[86%] -translate-x-1/2 rounded-sm bg-white shadow-inner"
              initial={{ y: 20, opacity: 0 }}
              animate={
                stage === 'opening' || stage === 'cracking'
                  ? { y: -26, opacity: 1 }
                  : { y: 20, opacity: 0 }
              }
              transition={{ duration: 0.8, ease: 'easeOut', delay: stage === 'opening' ? 0.15 : 0 }}
            >
              <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center">
                <span className="font-display text-4xl text-rose-500">{name}</span>
                <span className="font-utility text-sm tracking-[0.25em] text-wine-700/60 uppercase">Happy Birthday</span>
              </div>
            </motion.div>

            <div
              className="absolute bottom-0 left-0 h-[60%] w-full"
              style={{
                background: 'linear-gradient(180deg, transparent, var(--color-blush-200))',
                clipPath: 'polygon(0 100%, 100% 100%, 100% 30%, 50% 75%, 0 30%)',
              }}
            />

            <motion.div
              className="absolute left-0 top-0 h-full w-full origin-top"
              style={{
                clipPath: 'polygon(0 0, 100% 0, 50% 58%)',
                background: 'linear-gradient(160deg, var(--color-blush-100), var(--color-blush-200))',
                borderBottom: '1px solid rgba(194,149,74,0.3)',
                transformStyle: 'preserve-3d',
              }}
              animate={stage === 'closed' ? { rotateX: 0 } : { rotateX: -175 }}
              transition={{ duration: 0.85, ease: 'easeInOut', delay: stage === 'cracking' ? 0.1 : 0 }}
            />

            <motion.div
              className="absolute left-1/2 top-[46%] flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-white shadow-md"
              style={{ background: 'radial-gradient(circle at 35% 30%, #d9808f, var(--color-rose-600) 70%)' }}
              animate={
                stage === 'cracking'
                  ? { scale: [1, 1.15, 0], rotate: [0, -8, 25], opacity: [1, 1, 0] }
                  : { scale: 1, rotate: 0, opacity: 1 }
              }
              transition={{ duration: 0.55, ease: 'easeIn' }}
            >
              <span className="font-display text-lg leading-none">Z</span>
            </motion.div>
          </motion.button>

          <motion.p
            className="relative mt-8 font-utility text-sm tracking-[0.3em] text-blush-100/80 uppercase"
            animate={{ opacity: stage === 'closed' ? 1 : 0 }}
            transition={{ duration: 0.4 }}
          >
            Tap the seal to open
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
