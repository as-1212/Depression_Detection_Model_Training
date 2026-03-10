import React, { useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  AreaChart,
  Area,
} from 'recharts';
import { motion } from 'framer-motion';
import { Activity, TrendingUp, SmilePlus, AlertTriangle } from 'lucide-react';

function formatMoodScore(score) {
  if (score == null) return '—';
  if (score >= 0.7) return 'Positive';
  if (score >= 0.4) return 'Mixed';
  return 'Low';
}

export function DashboardSection({ entries }) {
  const hasData = entries && entries.length > 0;

  const stats = useMemo(() => {
    if (!hasData) {
      return {
        avgMood: null,
        positiveRatio: null,
        total: 0,
      };
    }
    const total = entries.length;
    const sum = entries.reduce((acc, e) => acc + (e.moodScore ?? 0.5), 0);
    const positives = entries.filter((e) => e.moodScore >= 0.5).length;
    return {
      avgMood: sum / total,
      positiveRatio: positives / total,
      total,
    };
  }, [entries, hasData]);

  const lineData = useMemo(
    () =>
      (entries || []).map((entry, idx) => ({
        index: idx + 1,
        label: entry.label || `Entry ${idx + 1}`,
        moodScore: entry.moodScore,
        confidence: entry.confidence,
      })),
    [entries],
  );

  return (
    <div className="space-y-5">
      <motion.div
        className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Emotion dashboard
          </p>
          <h2 className="mt-1 text-[26px] font-semibold leading-snug tracking-tight text-slate-50 md:text-[28px]">
            See how your mood shifts over time.
          </h2>
          <p className="mt-2 max-w-xl text-sm text-slate-400">
            Each analysis creates a private entry. This dashboard gives you a gentle,
            high-level view of emotional trends, not a clinical assessment.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-800/80 bg-surface-subtle/90 px-3 py-2.5 text-[11px] text-slate-400">
          <p className="flex items-center gap-1.5">
            <Activity className="h-3.5 w-3.5 text-primary-soft" />
            <span className="font-medium text-slate-300">
              Data never leaves this browser session.
            </span>
          </p>
          <p className="mt-1 text-[10px] text-slate-500">
            Refreshing the page will clear your local history. To keep a record, export
            your notes separately.
          </p>
        </div>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          className="card-elevated card-hover rounded-3xl p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
        >
          <p className="text-[11px] text-slate-500">Average mood signal</p>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-xl font-semibold text-slate-50">
              {stats.avgMood ? (stats.avgMood * 100).toFixed(0) : '—'}%
            </span>
            <span className="text-[11px] text-slate-500">
              {formatMoodScore(stats.avgMood)}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="card-elevated card-hover rounded-3xl p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-[11px] text-slate-500">Entries analyzed</p>
          <div className="mt-2 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary-soft" />
            <span className="text-xl font-semibold text-slate-50">
              {stats.total || 0}
            </span>
          </div>
        </motion.div>

        <motion.div
          className="card-elevated card-hover rounded-3xl p-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
        >
          <p className="text-[11px] text-slate-500">Positive vs heavy entries</p>
          <div className="mt-2 flex items-center gap-2">
            {stats.positiveRatio != null && stats.positiveRatio >= 0.5 ? (
              <SmilePlus className="h-4 w-4 text-positive" />
            ) : (
              <AlertTriangle className="h-4 w-4 text-warning" />
            )}
            <span className="text-xl font-semibold text-slate-50">
              {stats.positiveRatio != null
                ? `${Math.round(stats.positiveRatio * 100)}%`
                : '—'}
            </span>
          </div>
        </motion.div>
      </div>

      <div className="grid gap-4 md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <motion.div
          className="card-elevated card-hover rounded-3xl p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
        >
          <div className="mb-3 flex items-center justify-between gap-2">
            <p className="text-xs font-medium text-slate-300">
              Mood score across entries
            </p>
            <span className="text-[11px] text-slate-500">
              Higher values suggest lighter emotional tone.
            </span>
          </div>
          <div className="h-52">
            {hasData ? (
              <ResponsiveContainer>
                <LineChart data={lineData}>
                  <CartesianGrid stroke="#1f2933" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="index"
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 1]}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#020617',
                      borderRadius: 12,
                      border: '1px solid rgba(30,64,175,0.45)',
                      fontSize: 11,
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="moodScore"
                    stroke="#7C6CFF"
                    strokeWidth={2}
                    dot={{ r: 3 }}
                    activeDot={{ r: 5 }}
                    isAnimationActive
                    animationDuration={400}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-500">
                Run a few analyses to see your personal trend over time.
              </div>
            )}
          </div>
        </motion.div>

        <motion.div
          className="card-elevated card-hover rounded-3xl p-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22 }}
        >
          <div className="mb-3">
            <p className="text-xs font-medium text-slate-300">
              Confidence across entries
            </p>
            <p className="text-[11px] text-slate-500">
              How sure the model felt about each assessment.
            </p>
          </div>
          <div className="h-52">
            {hasData ? (
              <ResponsiveContainer>
                <AreaChart data={lineData}>
                  <CartesianGrid stroke="#111827" strokeDasharray="3 3" />
                  <XAxis
                    dataKey="index"
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 1]}
                    tick={{ fill: '#6B7280', fontSize: 11 }}
                    tickLine={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#020617',
                      borderRadius: 12,
                      border: '1px solid rgba(54,83,186,0.5)',
                      fontSize: 11,
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="confidence"
                    stroke="#A78BFA"
                    fill="#4C1D95"
                    fillOpacity={0.4}
                    isAnimationActive
                    animationDuration={400}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-xs text-slate-500">
                Confidence appears once you start using the analyzer.
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

