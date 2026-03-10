import React, { useEffect, useState } from 'react';

function getInitialTheme() {
  if (typeof window === 'undefined') return 'dark';
  const stored = window.localStorage.getItem('theme');
  if (stored === 'light' || stored === 'dark') return stored;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function Layout({ children }) {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    window.localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));

  return (
    <div className="min-h-screen bg-soft-gradient text-slate-100 transition-colors duration-500">
      <div className="min-h-screen bg-slate-950/75">
        <header className="border-b border-slate-800/80 backdrop-blur-xl sticky top-0 z-30 bg-slate-950/70">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 md:px-6">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-soft to-primary shadow-lg shadow-primary/40">
                <span className="text-xl">🧠</span>
              </div>
              <div>
                <h1 className="text-base font-semibold tracking-tight md:text-lg">
                  MindGuard<span className="text-primary-soft"> AI</span>
                </h1>
                <p className="text-xs text-slate-400 md:text-[13px]">
                  Mental health awareness & support
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={toggleTheme}
                className="inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/70 px-3 py-1.5 text-xs font-medium text-slate-200 shadow-sm shadow-slate-900/70 transition hover:border-primary hover:bg-slate-900"
              >
                <span
                  className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-slate-800 text-[11px]"
                  aria-hidden="true"
                >
                  {theme === 'dark' ? '🌙' : '☀️'}
                </span>
                <span className="hidden sm:inline">
                  {theme === 'dark' ? 'Dark mode' : 'Light mode'}
                </span>
              </button>
            </div>
          </div>
        </header>
        <main className="mx-auto max-w-6xl px-4 py-10 md:px-6 md:py-14">{children}</main>
        <footer className="border-t border-slate-800/80 bg-slate-950/80">
          <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-slate-500 md:flex-row md:items-center md:justify-between md:px-6">
            <p>
              This tool is for educational and awareness purposes only and is{' '}
              <span className="font-semibold text-slate-300">
                not a diagnostic instrument
              </span>
              . Please consult a licensed professional for medical advice.
            </p>
            <p className="text-[11px] text-slate-500">
              Built with FastAPI, XGBoost & React.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
}

