/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        secondary: ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: '#7C6CFF',
          soft: '#A78BFA',
        },
        positive: '#22C55E',
        warning: '#F87171',
        surface: {
          soft: '#111827',
          subtle: '#0F172A',
          deep: '#0B1020',
        },
      },
      backgroundImage: {
        'shell-gradient':
          'radial-gradient(circle at 20% 30%, rgba(124,108,255,0.18), transparent 40%), radial-gradient(circle at 80% 70%, rgba(167,139,250,0.16), transparent 45%)',
      },
      boxShadow: {
        soft: '0 18px 45px rgba(15, 23, 42, 0.55)',
        'soft-lg': '0 24px 60px rgba(15, 23, 42, 0.7)',
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.35s ease-out both',
        'pulse-soft': 'pulseSoft 2.4s ease-in-out infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: 0.4 },
          '50%': { opacity: 0.9 },
        },
      },
    },
  },
  plugins: [],
};

