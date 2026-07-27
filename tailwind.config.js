/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'marlow-ink': '#121212',      // near-black base, primary bg
        'marlow-panel': '#1c1c1c',    // raised surfaces / cards
        'marlow-bone': '#f3efe4',     // warm off-white for text on dark
        'marlow-acid': '#d4ff3d',     // signature acid-lime accent (CTAs, badges)
        'marlow-blaze': '#ff5a1f',    // secondary accent (sale, alerts, stock warnings)
        'marlow-smoke': '#8a8a86',    // muted secondary text
        'marlow-line': '#2e2e2b',     // hairline borders/dividers on dark surfaces
      },
      fontFamily: {
        display: ['"Anton"', 'sans-serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'slide-in': {
          from: { transform: 'translateX(100%)' },
          to: { transform: 'translateX(0)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
      },
      animation: {
        'slide-in': 'slide-in 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fade-in 0.2s ease-out',
      },
    },
  },
  plugins: [],
}
