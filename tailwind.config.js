/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#faf7fc',
          100: '#f3ecf8',
          200: '#e8d9f2',
          300: '#d5b8e6',
          400: '#be92d6',
          500: '#a06cc2',
          600: '#714790',
          700: '#5e3a78',
          800: '#4d3062',
          900: '#402851',
          950: '#291838',
        },
        accent: {
          50:  '#effcfd',
          100: '#d5f7f9',
          200: '#b0eff4',
          300: '#7ae3eb',
          400: '#3cbcc8',
          500: '#21a8b5',
          600: '#1d8998',
          700: '#196e7c',
          800: '#1b5a65',
          900: '#1b4b55',
          950: '#0c3038',
          DEFAULT: '#3cbcc8',
          hover:   '#2a9faa',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        dynamic: {
          light: 'rgb(var(--color-dynamic-light) / <alpha-value>)',
          main:  'rgb(var(--color-dynamic-main) / <alpha-value>)',
          dark:  'rgb(var(--color-dynamic-dark) / <alpha-value>)',
          muted: 'rgb(var(--color-dynamic-muted) / <alpha-value>)',
        },
        surface: {
          DEFAULT: 'var(--color-surface)',
          2:       'var(--color-surface-2)',
          offset:  'var(--color-surface-offset)',
        },
      },
      fontFamily: {
        display: ['Bebas Neue', 'Cabinet Grotesk', 'Impact', 'sans-serif'],
        sans:    ['Satoshi', 'Cabinet Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        accent:  ['Zodiak', 'DM Serif Display', 'serif'],
      },
      borderRadius: {
        'creeser': '12px',
      },
      boxShadow: {
        'soft':         '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        'glow-primary': '0 0 24px oklch(0.45 0.15 305 / 0.4)',
        'glow-accent':  '0 0 20px oklch(0.75 0.14 190 / 0.35)',
      },
    },
  },
  plugins: [],
}
