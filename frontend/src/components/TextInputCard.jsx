import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function TextInputCard({ text, onChange, onSubmit, isLoading }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim() || isLoading) return;
    onSubmit();
  };

  const remaining = Math.max(0, 1200 - text.length);

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Text analyzer
          </p>
          <h2 className="mt-1 text-[24px] font-semibold leading-snug tracking-tight text-slate-50 md:text-[26px]">
            Share what&apos;s been on your mind lately.
          </h2>
        </div>
        <div className="hidden text-right text-[11px] text-slate-500 md:block">
          <p>Ideal length: 3–8 sentences.</p>
          <p className="text-slate-600">
            Your text is processed in memory and not stored.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleSubmit}
        className="card-elevated card-hover rounded-3xl p-4 md:p-5 space-y-3.5"
      >
        <div className="flex items-center justify-between gap-3 text-[12px]">
          <div className="flex items-center gap-1.5 text-slate-400">
            <Sparkles className="h-3.5 w-3.5 text-primary-soft" />
            <span>Describe real or hypothetical feelings in your own words.</span>
          </div>
          <span className="hidden text-[11px] text-slate-500 sm:inline">
            {remaining} characters left
          </span>
        </div>

        <div className="relative">
          <textarea
            value={text}
            onChange={(e) => onChange(e.target.value.slice(0, 1200))}
            className="textarea-mental h-44 md:h-40"
            placeholder="For example: Over the last few weeks I've been waking up heavy and unmotivated. I still get things done, but it feels like I'm moving through fog..."
          />
          <div className="pointer-events-none absolute inset-x-4 bottom-2 flex justify-between text-[10px] text-slate-500">
            <span>More nuance and context usually help the model respond gently.</span>
            <span className="md:hidden">{remaining} left</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
          <p className="max-w-md text-[11px] text-slate-500">
            If you feel at immediate risk of harming yourself or others, please contact
            your local emergency number or a crisis hotline instead of relying on this
            tool.
          </p>
          <motion.button
            type="submit"
            disabled={isLoading || !text.trim()}
            className="btn-primary"
            whileTap={{ scale: 0.97 }}
          >
            {isLoading && (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-slate-100/40 border-b-transparent" />
            )}
            <span>{isLoading ? 'Analyzing...' : 'Analyze text'}</span>
          </motion.button>
        </div>
      </form>
    </motion.section>
  );
}

