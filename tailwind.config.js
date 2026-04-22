/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#050812',
        brand: {
          50: '#eef4ff',
          100: '#dbe8ff',
          200: '#bed3f0',
          300: '#98b4d5',
          400: '#7898bb',
          500: '#607fa2',
          600: '#4e6886',
          700: '#3f536c',
          800: '#33465b',
          900: '#2a394a',
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
