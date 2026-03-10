import React, { useMemo } from 'react';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, Radar } from 'recharts';
import { motion } from 'framer-motion';
import { Activity } from 'lucide-react';

const BASE_EMOTIONS = ['Sadness', 'Anxiety', 'Neutral', 'Hopefulness', 'Fatigue'];

export function EmotionVisualization({ prediction }) {
  const data = useMemo(() => {
    if (!prediction) {
      return BASE_EMOTIONS.map((label) => ({ emotion: label, value: 0 }));
    }

    const isDepressed = prediction.prediction?.toLowerCase().includes('depression');
    const conf = typeof prediction.confidence === 'number' ? prediction.confidence : 0.6;
    const base = isDepressed
      ? { Sadness: 0.8, Anxiety: 0.7, Neutral: 0.35, Hopefulness: 0.25, Fatigue: 0.75 }
      : { Sadness: 0.25, Anxiety: 0.3, Neutral: 0.7, Hopefulness: 0.75, Fatigue: 0.3 };

    return BASE_EMOTIONS.map((emotion) => ({
      emotion,
      value: Math.min(1, base[emotion] * (0.75 + conf * 0.5)),
    }));
  }, [prediction]);

  return (
    <motion.div
      className="card-elevated card-hover rounded-3xl p-4"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
    >
      <div className="mb-3 flex items-center justify-between gap-2">
        <div>
          <p className="text-xs font-medium text-slate-300">Emotional landscape</p>
          <p className="text-[11px] text-slate-500">
            Visual approximation based on the model&apos;s assessment.
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-surface-subtle/80 px-2 py-1 text-[11px] text-slate-400">
          <Activity className="h-3 w-3" />
          <span>Experimental</span>
        </span>
      </div>
      <div className="h-48">
        <ResponsiveContainer>
          <RadarChart data={data}>
            <PolarGrid stroke="#1f2937" />
            <PolarAngleAxis
              dataKey="emotion"
              tick={{ fill: '#9CA3AF', fontSize: 10 }}
            />
            <Radar
              dataKey="value"
              stroke="#7C6CFF"
              fill="#7C6CFF"
              fillOpacity={0.4}
              strokeWidth={1.6}
              isAnimationActive
              animationDuration={400}
              animationEasing="ease-out"
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

