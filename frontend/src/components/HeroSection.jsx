import React from 'react';
import { motion } from 'framer-motion';
import { Brain, ShieldCheck } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="pb-4 pt-3 md:pb-6 md:pt-1">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] md:items-start">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="space-y-4"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-subtle/80 px-3 py-1.5 text-[11px] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-soft" />
            <span className="font-secondary tracking-[0.18em] uppercase">
              MindGuard • Emotional insight
            </span>
          </div>
          <h1 className="max-w-xl text-[34px] font-semibold leading-[1.1] tracking-tight text-slate-50 sm:text-[40px] md:text-[44px]">
            Understand the emotional tone of your thoughts,
            <span className="block font-secondary text-primary-soft">
              without being judged by them.
            </span>
          </h1>
          <p className="max-w-xl text-[15px] leading-relaxed text-slate-400">
            MindGuard uses a TF‑IDF + XGBoost model to gently flag text that may carry
            signs of depression. It&apos;s not a diagnosis, but a private companion to
            help you notice patterns and seek support sooner.
          </p>
          <div className="flex flex-wrap items-center gap-3 text-[12px] text-slate-400">
            <div className="inline-flex items-center gap-2 rounded-full bg-surface-subtle/90 px-3 py-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-primary-soft" />
              <span>Analyses stay in this session only</span>
            </div>
            <span className="text-slate-500">•</span>
            <span>Designed for reflection, not diagnosis</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="relative"
        >
          <div className="pointer-events-none absolute -left-6 -top-10 h-32 w-32 rounded-full bg-primary/25 blur-3xl" />
          <div className="pointer-events-none absolute -right-4 bottom-0 h-28 w-28 rounded-full bg-primary-soft/25 blur-3xl" />

          <div className="card-elevated rounded-3xl pl-4 pr-3 pt-3 pb-4 md:pl-5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/15 text-primary-soft">
                  <Brain className="h-4.5 w-4.5" />
                </span>
                <div>
                  <p className="text-xs font-medium text-slate-200">Model snapshot</p>
                  <p className="text-[11px] text-slate-500">
                    TF‑IDF • XGBoost • FastAPI
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] text-emerald-300 ring-1 ring-emerald-500/50">
                Healthy • Online
              </span>
            </div>

            <div className="mt-4 space-y-3 text-[12px] text-slate-200">
              <div className="rounded-2xl bg-surface-subtle/95 px-3 py-2.5">
                &ldquo;I&apos;ve been showing up for everyone else, but lately I&apos;m not
                sure how to show up for myself.&rdquo;
              </div>
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Model confidence</span>
                  <span>0.82</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-surface-subtle/90">
                  <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-warning to-primary-soft" />
                </div>
              </div>
              <p className="text-[11px] text-slate-500">
                This preview is illustrative, not a real assessment. Use the analyzer
                below to explore your own text.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

