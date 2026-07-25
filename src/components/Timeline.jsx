import { motion } from 'framer-motion';

// Edit these to match your actual two weeks together.
const moments = [
  { day: 'Day 1', title: 'The first hello', text: 'Neither of us knew where this would go. I\u2019m glad we found out anyway.' },
  { day: 'Day 4', title: 'The long conversation', text: 'The one that went on way too late and somehow still felt too short.' },
  { day: 'Day 9', title: 'That inside joke', text: 'The one that still makes no sense to anyone else but us.' },
  { day: 'Day 14', title: 'Today', text: 'Your birthday. And somehow already one of my favorite days.' },
];

export default function Timeline() {
  return (
    <section className="section-glow relative min-h-screen px-6 py-24">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.8 }}
        className="mb-16 text-center"
      >
        <span className="font-script text-4xl text-rose-500">Three weeks, so far</span>
        <p className="mx-auto mt-3 max-w-md font-serif text-lg italic text-wine-700/70">
          Not very long. Already worth remembering.
        </p>
      </motion.div>

      <div className="relative mx-auto max-w-md">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-gradient-to-b from-gold-400/70 via-rose-300/60 to-transparent" />

        <div className="space-y-14">
          {moments.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.7, delay: 0.05 }}
              className="relative flex flex-col gap-2 pl-12"
            >
              <span className="absolute left-4 top-1.5 h-3 w-3 -translate-x-1/2 rounded-full border-2 border-blush-50 bg-rose-500" />
              <span className="font-display text-2xl text-wine-700">{m.title}</span>
              <p className="font-serif text-lg italic text-wine-700/75">{m.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
