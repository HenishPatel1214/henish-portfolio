/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#03070f',
        brand: {
          50: '#effff5',
          100: '#d6f9e4',
          200: '#aef2ca',
          300: '#7ee7a8',
          400: '#4fd68b',
          500: '#2ab873',
          600: '#1c955e',
          700: '#16764d',
          800: '#145d3f',
          900: '#124d36',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 48px -24px rgba(0, 0, 0, 0.85), 0 8px 24px -18px rgba(0, 0, 0, 0.9)',
      },
    },
  },
  plugins: [],
}
