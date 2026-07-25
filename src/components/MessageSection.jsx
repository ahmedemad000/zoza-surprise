import { motion } from 'framer-motion';

const linesOne = [
  'Three weeks isn\u2019t very long.',
  'But somehow, you\u2019ve made it feel like something worth celebrating loudly.',
  'You are beautiful \u2014 not just in the way you look, but in the way you laugh at your own jokes, the way you light up talking about the things you love, the way you make ordinary moments feel a little brighter.',
];

const linesTwo = [
  'I keep noticing small things. The way you say certain words الثغنن. The way you get excited over nothing and everything at once.',
  'I don\u2019t know exactly what this is yet. But I know today isn\u2019t a day to overthink that \u2014 it\u2019s a day to just tell you the truth. قولا واحدااا',
  { text: 'you are the best girl in the world.', accent: true },
];

function Line({ text, accent, i }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.7 }}
      transition={{ duration: 0.7, delay: i * 0.15, ease: 'easeOut' }}
      className={
        accent
          ? 'font-display text-center text-4xl text-rose-500 sm:text-5xl'
          : 'text-center font-serif text-2xl italic leading-relaxed text-wine-700/85 sm:text-3xl'
      }
    >
      {text}
    </motion.p>
  );
}

export default function MessageSection() {
  return (
    <section className="section-glow relative flex min-h-screen flex-col items-center justify-center px-6 py-24">
      <div className="mx-auto max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8 }}
          className="mb-10 text-center"
        >
          <span className="font-script text-4xl text-rose-500">A little letter for you</span>
        </motion.div>

        <div className="space-y-7">
          {linesOne.map((l, i) => (
            <Line key={`a${i}`} text={l} i={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mx-auto my-12 h-px w-24 bg-gold-400/50"
        />

        <div className="space-y-7">
          {linesTwo.map((l, i) =>
            typeof l === 'string' ? (
              <Line key={`b${i}`} text={l} i={i} />
            ) : (
              <Line key={`b${i}`} text={l.text} accent i={i} />
            )
          )}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 1.1 }}
          className="mt-14 text-center font-utility text-sm tracking-[0.3em] text-wine-700/50 uppercase"
        >
          Happy Birthday, Zoza
        </motion.p>
      </div>
    </section>
  );
}
