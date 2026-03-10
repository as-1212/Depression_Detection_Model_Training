import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, MoonStar, Heart } from 'lucide-react';

const TIPS = [
  {
    title: 'You are allowed to take up space',
    body: 'Your feelings, even the messy and confusing ones, still matter. You do not need to be productive or cheerful to deserve care.',
    icon: Heart,
  },
  {
    title: 'Tiny steps are still steps',
    body: 'On heavy days, “I got out of bed” or “I answered one message” can be enough. Progress does not have to look impressive to be real.',
    icon: Leaf,
  },
  {
    title: 'Rest is not a reward',
    body: 'You are allowed to rest because you are human, not because you earned it. Sometimes the kindest thing you can do is pause.',
    icon: MoonStar,
  },
];

export function MentalHealthTips() {
  return (
    <section className="space-y-3">
      <motion.h3
        className="text-[17px] font-semibold text-slate-100"
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        Gentle reminders for difficult days
      </motion.h3>
      <div className="grid gap-4 md:grid-cols-3">
        {TIPS.map((tip, idx) => {
          const Icon = tip.icon;
          return (
            <motion.article
              key={tip.title}
              className="card-elevated card-hover rounded-3xl p-4"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.04 * idx }}
            >
              <div className="mb-2.5 flex items-center gap-2.5">
                <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-primary/15 text-primary-soft">
                  <Icon className="h-4 w-4" />
                </span>
                <h4 className="text-[14px] font-medium text-slate-50">{tip.title}</h4>
              </div>
              <p className="text-[12px] leading-relaxed text-slate-400">{tip.body}</p>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

