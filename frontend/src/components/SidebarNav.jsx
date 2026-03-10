import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  MessageCircle,
  Activity,
  HeartHandshake,
  Home,
} from 'lucide-react';

const navItems = [
  { id: 'home', label: 'Overview', icon: Home },
  { id: 'analyze', label: 'Analyze Text', icon: Sparkles },
  { id: 'chat', label: 'AI Support Chat', icon: MessageCircle },
  { id: 'dashboard', label: 'Emotion Trends', icon: Activity },
  { id: 'resources', label: 'Resources', icon: HeartHandshake },
];

export function SidebarNav({ activeSection, onChange }) {
  return (
    <aside className="hidden w-56 shrink-0 md:block">
      <div className="card-elevated card-hover h-full rounded-3xl p-3">
        <div className="mb-3 px-1">
          <p className="text-[11px] font-secondary uppercase tracking-[0.18em] text-slate-500">
            Navigation
          </p>
        </div>
        <nav className="space-y-1.5 text-sm">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = item.id === activeSection;
            return (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => onChange(item.id)}
                whileHover={{ x: 4 }}
                className={`flex w-full items-center gap-2.5 rounded-2xl px-2.5 py-2 text-left text-[13px] ${
                  isActive
                    ? 'bg-primary/10 text-slate-50'
                    : 'text-slate-300 hover:bg-surface-subtle/80'
                }`}
              >
                <span
                  className={`flex h-7 w-7 items-center justify-center rounded-xl border text-xs ${
                    isActive
                      ? 'border-primary/70 bg-primary/15 text-primary-soft'
                      : 'border-slate-700/80 bg-surface-deep/70 text-slate-400'
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                </span>
                <span className="truncate">{item.label}</span>
              </motion.button>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}

