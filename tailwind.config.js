/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Colores de Marca Estáticos (Basados en logo/redes)
        primary: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae0fd',
          300: '#7cc8fb',
          400: '#36adf7',
          500: '#0c92eb',
          600: '#0074ca', // Azul Creeser principal
          700: '#015da4',
          800: '#064f86',
          900: '#0b426f',
          950: '#072a4a',
        },
        accent: {
          DEFAULT: '#E31E24', // Rojo Pasión
          hover: '#C1171D',
        },
        gold: {
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
        },
        // Sistema de Color Dinámico (Variables CSS)
        dynamic: {
          light: 'rgb(var(--color-dynamic-light) / <alpha-value>)',
          main: 'rgb(var(--color-dynamic-main) / <alpha-value>)',
          dark: 'rgb(var(--color-dynamic-dark) / <alpha-value>)',
          muted: 'rgb(var(--color-dynamic-muted) / <alpha-value>)',
        }
      },
      fontFamily: {
        display: ['Poppins', 'Montserrat', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'creeser': '12px',
      },
      boxShadow: {
        'soft': '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}
