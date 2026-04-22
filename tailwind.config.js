/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        page: '#040905',
        brand: {
          50: '#f1fff7',
          100: '#d6fbe5',
          200: '#b0f3d0',
          300: '#7fe7b0',
          400: '#51d392',
          500: '#34b978',
          600: '#27935f',
          700: '#1f734c',
          800: '#1b5a3e',
          900: '#174a34',
        },
      },
      fontFamily: {
        display: ['Sora', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 24px 48px -24px rgba(3, 12, 8, 0.86), 0 8px 24px -18px rgba(4, 18, 11, 0.92)',
      },
    },
  },
  plugins: [],
}
