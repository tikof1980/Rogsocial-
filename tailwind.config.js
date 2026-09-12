/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f2',
          500: '#ff2d55',
          600: '#e0184a',
          700: '#b3123a'
        }
      }
    }
  },
  plugins: []
};
