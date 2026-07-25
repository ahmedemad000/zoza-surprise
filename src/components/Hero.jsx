import { motion } from 'framer-motion';

export default function Hero({ name }) {
  return (
    <section className="section-glow relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 text-center">
      <motion.div
        className="pointer-events-none absolute h-[420px] w-[420px] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(226,168,178,0.35), transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="relative font-utility text-sm tracking-[0.35em] text-rose-500 uppercase"
      >
        Happy Birthday
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, delay: 0.6, ease: 'easeOut' }}
        className="font-display text-shimmer relative mt-3 text-[4.2rem] leading-none text-transparent bg-clip-text sm:text-[7rem]"
        style={{
          backgroundImage:
            'linear-gradient(100deg, var(--color-gold-500), var(--color-rose-500) 35%, var(--color-gold-400) 60%, var(--color-rose-400))',
          filter: 'drop-shadow(0 4px 30px rgba(194,149,74,0.35))',
        }}
      >
        {name}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 1.3 }}
        className="relative mt-6 flex items-center gap-3 text-gold-500"
      >
        <span className="h-px w-10 bg-gold-400/60" />
        <span className="font-utility text-sm tracking-[0.25em] uppercase text-wine-700/70">
          The most beautiful girl in the world
        </span>
        <span className="h-px w-10 bg-gold-400/60" />
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.7 }}
        className="relative mt-8 max-w-md font-serif text-xl italic text-wine-700/75"
      >
        Today is entirely about you. Scroll down — there's a lot I want to show you.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.2 }}
        className="absolute bottom-10 flex flex-col items-center gap-2"
      >
        <span className="font-utility text-sm tracking-[0.3em] text-wine-700/55 uppercase">Scroll</span>
        <motion.span
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="block h-8 w-px bg-gradient-to-b from-rose-400 to-transparent"
        />
      </motion.div>
    </section>
  );
}
