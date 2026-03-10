import React from 'react';
import { motion } from 'framer-motion';
import { Wind, SunMedium, BookOpenCheck, HeartHandshake } from 'lucide-react';

const resources = [
  {
    id: 'breathing',
    title: '2-minute breathing reset',
    icon: Wind,
    steps: [
      'Inhale gently through your nose for a count of 4.',
      'Hold for a soft count of 4.',
      'Exhale slowly through your mouth for a count of 6.',
      'Repeat for 6–8 cycles while noticing your shoulders dropping.',
    ],
  },
  {
    id: 'grounding',
    title: '5-senses grounding',
    icon: SunMedium,
    steps: [
      'Name 5 things you can see.',
      'Notice 4 things you can feel.',
      'Listen for 3 different sounds.',
      'Become aware of 2 smells around you.',
      'Identify 1 taste in your mouth or imagine a comforting one.',
    ],
  },
  {
    id: 'reframe',
    title: 'Gentle thought reframing',
    icon: BookOpenCheck,
    steps: [
      'Write down the self-critical thought exactly as it appears.',
      'Ask yourself how you would respond if a close friend said this.',
      'Rewrite the thought in a kinder, more balanced way.',
      'Keep both versions to notice how language shifts your mood.',
    ],
  },
];

export function ResourcesSection() {
  return (
    <section className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
          Gentle tools
        </p>
        <h2 className="mt-1 text-[26px] font-semibold leading-snug tracking-tight text-slate-50 md:text-[28px]">
          Small practices that can support your nervous system.
        </h2>
        <p className="mt-2 max-w-xl text-sm text-slate-400">
          These exercises are not cures, but they can create small pockets of relief and
          space when emotions feel loud.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        {resources.map((res, idx) => {
          const Icon = res.icon;
          return (
            <motion.article
              key={res.id}
              className="card-elevated card-hover rounded-3xl p-4"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 * idx }}
            >
              <div className="mb-2 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/15 text-primary-soft">
                  <Icon className="h-4 w-4" />
                </span>
                <h3 className="text-[14px] font-medium text-slate-50">{res.title}</h3>
              </div>
              <ul className="mt-1 space-y-1.5 text-[12px] text-slate-400">
                {res.steps.map((step) => (
                  <li key={step}>• {step}</li>
                ))}
              </ul>
            </motion.article>
          );
        })}
      </div>

      <motion.div
        className="mt-1 flex items-start gap-2 rounded-2xl border border-slate-800/80 bg-surface-subtle/90 px-3 py-2.5 text-[11px] text-slate-400"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <HeartHandshake className="mt-0.5 h-3.5 w-3.5 text-primary-soft" />
        <p>
          These tools are designed to sit alongside, not replace, professional care. If
          you&apos;re able to, consider sharing what you notice here with a therapist,
          counsellor or trusted person.
        </p>
      </motion.div>
    </section>
  );
}

