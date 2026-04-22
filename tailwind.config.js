/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#03050d',
        brand: {
          50: '#eef5ff',
          100: '#dbe8ff',
          200: '#c0d6ff',
          300: '#95bbff',
          400: '#6d9eff',
          500: '#4f83f5',
          600: '#3d69d6',
          700: '#3152ad',
          800: '#274186',
          900: '#213568',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 48px -24px rgba(3, 7, 24, 0.86), 0 8px 24px -18px rgba(8, 22, 58, 0.9)',
      },
    },
  },
  plugins: [],
}
