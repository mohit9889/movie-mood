/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './layouts/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    colors: {
      black: {
        DEFAULT: '#000',
        primary: '#141414',
        secondary: '#242424',
      },
      white: {
        DEFAULT: '#fff',
        primary: '#f8f8f8',
      },
      green: '#00C31F',
    },
    extend: {
      colors: {
        primary: 'var(--color-primary)',
        secondary: 'var(--color-secondary)',
        buttons: 'var(--color-buttons)',
        typography: 'var(--color-typography)',
      },
      fontFamily: {
        sans: ['var(--font-nunito)'],
      },
    },
  },
  plugins: [],
};
