import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SidebarNav } from '../components/SidebarNav.jsx';
import { HeroSection } from '../components/HeroSection.jsx';
import { TextInputCard } from '../components/TextInputCard.jsx';
import { ResultCard } from '../components/ResultCard.jsx';
import { MentalHealthTips } from '../components/MentalHealthTips.jsx';
import { EmotionVisualization } from '../components/EmotionVisualization.jsx';
import { ChatSupportSection } from '../components/ChatSupportSection.jsx';
import { DashboardSection } from '../components/DashboardSection.jsx';
import { ResourcesSection } from '../components/ResourcesSection.jsx';
import { predictDepression } from '../services/api.js';

const sections = ['home', 'analyze', 'chat', 'dashboard', 'resources'];

export function HomePage() {
  const [activeSection, setActiveSection] = useState('analyze');
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState([]);

  const handlePredict = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await predictDepression(text);
      setResult(data);
      const moodScore =
        data.prediction && data.prediction.toLowerCase().includes('depression')
          ? 0.3 + 0.2 * (1 - data.confidence)
          : 0.6 + 0.3 * data.confidence;
      setEntries((prev) => [
        ...prev,
        {
          createdAt: new Date().toISOString(),
          label: `Entry ${prev.length + 1}`,
          moodScore,
          confidence: data.confidence,
        },
      ]);
      if (!sections.includes(activeSection)) {
        setActiveSection('dashboard');
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Prediction error', err);
      setError(
        'Unable to reach the analysis service. Please check your connection or try again in a moment.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app-shell-bg scroll-smooth">
      <div className="relative min-h-screen overflow-hidden">
        <div className="pointer-events-none absolute inset-0 bg-shell-gradient opacity-80" />
        <div className="relative z-10 flex min-h-screen flex-col">
          <header className="border-b border-slate-800/80 bg-surface-deep/80 backdrop-blur-xl">
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-6">
              <div className="flex items-center gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/20 text-primary-soft">
                  <span className="text-sm font-semibold">MG</span>
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-tight text-slate-50">
                    MindGuard
                    <span className="font-secondary text-primary-soft"> Studio</span>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Mental health insights, held gently.
                  </p>
                </div>
              </div>
              <div className="hidden items-center gap-3 text-[11px] text-slate-500 sm:flex">
                <span className="rounded-full bg-surface-subtle/80 px-3 py-1">
                  v1.0 • TF‑IDF + XGBoost
                </span>
              </div>
            </div>
          </header>

          <div className="mx-auto flex w-full max-w-6xl flex-1 gap-5 px-4 pb-7 pt-5 md:px-6 md:pb-8 md:pt-6">
            <SidebarNav activeSection={activeSection} onChange={setActiveSection} />

            <main className="flex-1 space-y-6">
              <HeroSection />

              {activeSection === 'analyze' && (
                <>
                  <TextInputCard
                    text={text}
                    onChange={setText}
                    onSubmit={handlePredict}
                    isLoading={isLoading}
                  />
                  <ResultCard result={result} error={error} />
                  <div className="grid gap-4 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
                    <EmotionVisualization prediction={result} />
                    <MentalHealthTips />
                  </div>
                </>
              )}

              {activeSection === 'home' && (
                <motion.section
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-5"
                >
                  <TextInputCard
                    text={text}
                    onChange={setText}
                    onSubmit={handlePredict}
                    isLoading={isLoading}
                  />
                  <ResultCard result={result} error={error} />
                  <MentalHealthTips />
                </motion.section>
              )}

              {activeSection === 'chat' && <ChatSupportSection />}

              {activeSection === 'dashboard' && <DashboardSection entries={entries} />}

              {activeSection === 'resources' && <ResourcesSection />}
            </main>
          </div>

          <footer className="border-t border-slate-800/80 bg-surface-deep/90">
            <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-3 text-[11px] text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
              <p>
                Built for educational and awareness purposes only. Not a diagnostic tool
                and not a substitute for professional mental health care.
              </p>
              <p className="text-[10px] text-slate-600">
                Model: TF‑IDF vectorizer + XGBoost classifier • API: FastAPI
              </p>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}

