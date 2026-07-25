import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

export default function Finale({ name, signature }) {
  const [lit, setLit] = useState(true);
  const [mic, setMic] = useState('idle'); // idle | requesting | listening | denied | unsupported

  const streamRef = useRef(null);
  const ctxRef = useRef(null);
  const rafRef = useRef(null);

  const blowCandle = useCallback(() => {
    setLit((wasLit) => {
      if (!wasLit) return wasLit;
      const colors = ['#c97b84', '#e3c98f', '#c9a05c', '#f3d9df', '#fdf6f2'];
      confetti({
        particleCount: 140,
        spread: 90,
        startVelocity: 38,
        origin: { y: 0.65 },
        colors,
        scalar: 0.9,
      });
      setTimeout(() => {
        confetti({ particleCount: 90, angle: 60, spread: 65, origin: { x: 0, y: 0.6 }, colors });
        confetti({ particleCount: 90, angle: 120, spread: 65, origin: { x: 1, y: 0.6 }, colors });
      }, 250);
      return false;
    });
  }, []);

  const stopMic = useCallback(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = null;
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    if (ctxRef.current) {
      ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    }
  }, []);

  const startMic = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      setMic('unsupported');
      return;
    }
    setMic('requesting');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const ctx = new AudioCtx();
      ctxRef.current = ctx;
      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      analyser.smoothingTimeConstant = 0.55;
      source.connect(analyser);
      const data = new Uint8Array(analyser.frequencyBinCount);
      setMic('listening');

      let sustained = 0;
      const THRESHOLD = 42;
      const FRAMES_NEEDED = 5;

      const tick = () => {
        analyser.getByteFrequencyData(data);
        // Blowing shows up as broadband energy concentrated in low-mid frequencies.
        const n = Math.floor(data.length * 0.5);
        let sum = 0;
        for (let i = 0; i < n; i++) sum += data[i];
        const avg = sum / n;

        sustained = avg > THRESHOLD ? sustained + 1 : 0;

        if (sustained >= FRAMES_NEEDED) {
          blowCandle();
          stopMic();
          setMic('idle');
          return;
        }
        rafRef.current = requestAnimationFrame(tick);
      };
      tick();
    } catch (err) {
      setMic('denied');
    }
  }, [blowCandle, stopMic]);

  useEffect(() => stopMic, [stopMic]);
  useEffect(() => {
    if (!lit) stopMic();
  }, [lit, stopMic]);

  const micHint =
    mic === 'listening'
      ? "Listening \u2014 blow now \ud83d\udca8"
      : mic === 'requesting'
      ? 'Waiting for mic permission\u2026'
      : mic === 'denied'
      ? "Mic blocked \u2014 just tap the flame instead"
      : mic === 'unsupported'
      ? "Your browser can't do mic input \u2014 tap the flame instead"
      : null;

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 py-24 text-center">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8 }}
        className="mb-2 font-utility text-sm tracking-[0.3em] text-rose-500 uppercase"
      >
        Make a wish
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="font-display text-4xl text-wine-700 sm:text-5xl"
      >
        {lit ? 'Blow out the candle' : 'Happiest birthday, ' + name}
      </motion.h2>

      {lit && (
        <motion.button
          type="button"
          onClick={startMic}
          disabled={mic === 'requesting' || mic === 'listening'}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="focus-ring mt-4 inline-flex items-center gap-2 rounded-full border border-gold-300/50 bg-white/50 px-4 py-2 font-utility text-sm tracking-[0.15em] text-wine-700/75 uppercase disabled:opacity-70"
        >
          <motion.span
            animate={mic === 'listening' ? { scale: [1, 1.3, 1] } : {}}
            transition={{ duration: 0.9, repeat: Infinity }}
          >
            🎤
          </motion.span>
          {mic === 'idle' ? 'Blow into your mic' : 'Listening…'}
        </motion.button>
      )}

      <AnimatePresence>
        {micHint && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-3 font-serif text-base italic text-wine-700/70"
          >
            {micHint}
          </motion.p>
        )}
      </AnimatePresence>

      {/* Cake */}
      <div className="relative mt-12">
        <button
          type="button"
          onClick={blowCandle}
          aria-label={lit ? 'Blow out the candle' : 'Candle blown out'}
          className="focus-ring group relative block"
        >
          {/* Flame */}
          <AnimatePresence>
            {lit && (
              <motion.div
                key="flame"
                className="absolute left-1/2 top-[-30px] -translate-x-1/2"
                initial={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.2, y: -6, transition: { duration: 0.35 } }}
                animate={{ scale: [1, 1.12, 0.95, 1], rotate: [-3, 3, -2, 2, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              >
                <svg width="20" height="28" viewBox="0 0 20 28">
                  <path
                    d="M10 0C10 0 18 10 18 17a8 8 0 1 1-16 0C2 10 10 0 10 0Z"
                    fill="url(#flameGrad)"
                  />
                  <defs>
                    <linearGradient id="flameGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#fff3d6" />
                      <stop offset="45%" stopColor="var(--color-gold-400)" />
                      <stop offset="100%" stopColor="var(--color-rose-500)" />
                    </linearGradient>
                  </defs>
                </svg>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Candle */}
          <div className="mx-auto h-14 w-3 rounded-sm" style={{ background: 'linear-gradient(180deg, var(--color-blush-200), var(--color-rose-400))' }} />

          {/* Cake body */}
          <div className="relative -mt-1 h-28 w-56 rounded-t-[2rem] shadow-[0_20px_40px_-15px_rgba(74,46,53,0.35)]" style={{ background: 'linear-gradient(180deg, #fff, var(--color-blush-100))' }}>
            <div className="absolute inset-x-0 top-0 h-5 rounded-t-[2rem]" style={{ background: 'linear-gradient(180deg, var(--color-blush-200), var(--color-blush-100))' }} />
            <div className="absolute inset-x-4 top-8 h-px bg-gold-300/50" />
            <div className="absolute inset-x-4 top-16 h-px bg-gold-300/50" />
          </div>
          <div className="h-4 w-64 -translate-x-1/2 rounded-b-md" style={{ marginLeft: '50%', background: 'linear-gradient(180deg, var(--color-rose-400), var(--color-rose-500))' }} />
        </button>
      </div>

      <AnimatePresence>
        {!lit && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="mt-14 w-full max-w-md rounded-sm border border-gold-300/40 bg-white/60 px-8 py-10 shadow-[0_20px_45px_-20px_rgba(74,46,53,0.3)] backdrop-blur-sm"
          >
            <p className="font-serif text-xl italic leading-relaxed text-wine-700/85">
              Whatever you wished for &mdash; I hope it finds you. And if it doesn&rsquo;t, I hope this
              did, even just a little.
            </p>
            <p className="mt-3 font-serif text-xl italic leading-relaxed text-wine-700/85">
              Happy birthday, {name}. Here&rsquo;s to many more.
            </p>
            <div className="mx-auto mt-6 h-px w-16 bg-gold-400/50" />
            <p className="mt-6 font-display text-3xl text-rose-500">{signature}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
