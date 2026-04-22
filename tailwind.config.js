/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#050821',
        brand: {
          50: '#eef2ff',
          100: '#dbe6ff',
          200: '#becfff',
          300: '#96aeff',
          400: '#6f8dff',
          500: '#5671f6',
          600: '#4658d8',
          700: '#3a46af',
          800: '#323b89',
          900: '#292f67',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 48px -24px rgba(7, 12, 40, 0.86), 0 8px 24px -18px rgba(16, 22, 58, 0.92)',
      },
    },
  },
  plugins: [],
}
