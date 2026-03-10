import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, CheckCircle2 } from 'lucide-react';

export function ResultCard({ result, error }) {
  if (!error && !result) return null;

  const isDepressed = result?.prediction?.toLowerCase().includes('depression');
  const confidencePercent =
    result && typeof result.confidence === 'number'
      ? Math.round(result.confidence * 100)
      : null;

  const barColor = isDepressed ? 'bg-warning' : 'bg-positive';

  return (
    <AnimatePresence>
      {error && (
        <motion.section
          key="error"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
          className="card-elevated rounded-3xl border border-warning/40 bg-warning/10 p-4 text-sm text-warning"
        >
          <div className="flex items-start gap-2">
            <AlertTriangle className="mt-0.5 h-4 w-4" />
            <div>
              <h3 className="text-sm font-semibold text-warning">Something went wrong</h3>
              <p className="mt-0.5 text-[12px] text-warning/90">{error}</p>
            </div>
          </div>
        </motion.section>
      )}

      {result && !error && (
        <motion.section
          key="result"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="card-elevated rounded-3xl p-4 md:p-5"
        >
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
                Model perspective
              </p>
              <h3 className="mt-1 text-[18px] font-semibold text-slate-50">
                {isDepressed
                  ? 'Signals of emotional heaviness detected'
                  : 'No strong depression signals detected'}
              </h3>
              <p className="mt-1 max-w-xl text-[12px] text-slate-400">
                This is a machine learning estimate of tone, not a diagnosis. Please use
                it as a nudge to reflect, not as a verdict on your experience.
              </p>
            </div>
            <div
              className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] ${
                isDepressed
                  ? 'bg-warning/10 text-warning ring-1 ring-warning/50'
                  : 'bg-positive/10 text-positive ring-1 ring-positive/50'
              }`}
            >
              {isDepressed ? (
                <AlertTriangle className="h-3.5 w-3.5" />
              ) : (
                <CheckCircle2 className="h-3.5 w-3.5" />
              )}
              <span className="font-medium">
                {isDepressed ? 'Gentle caution' : 'Generally lighter tone'}
              </span>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-start">
            <div className="space-y-3">
              <div className="rounded-2xl bg-surface-subtle/90 px-3.5 py-3">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Prediction</span>
                  {confidencePercent != null && (
                    <span>Confidence: {confidencePercent}%</span>
                  )}
                </div>
                <p className="mt-1 text-sm font-medium text-slate-100">
                  {result.prediction || 'N/A'}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span>Confidence bar</span>
                </div>
                <div className="h-2.5 overflow-hidden rounded-full bg-surface-subtle/90">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${confidencePercent || 0}%` }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className={`h-full rounded-full ${barColor}`}
                  />
                </div>
                <p className="text-[11px] text-slate-500">
                  Higher confidence means the model has seen similar emotional patterns
                  before, not that it is &quot;right&quot; about your story.
                </p>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-800/80 bg-surface-subtle/95 p-3.5 text-[11px] text-slate-300">
              <p className="text-[11px] font-semibold text-slate-200">
                If this result feels heavy:
              </p>
              <ul className="space-y-1.5">
                <li>• Take a slow breath and notice your body in the chair or bed.</li>
                <li>
                  • Consider reaching out to a friend, family member or mental health
                  professional.
                </li>
                <li>
                  • If you&apos;re in immediate crisis, contact local emergency services or
                  a crisis hotline.
                </li>
              </ul>
              <p className="pt-1 text-[10px] text-slate-500">
                This card is not a substitute for professional support, diagnosis or
                treatment. It is only one small reflection on the words you typed.
              </p>
            </div>
          </div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

