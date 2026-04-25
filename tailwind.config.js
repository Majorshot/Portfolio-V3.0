/* eslint-env node */
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
        mono: ['Space Mono', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      fontWeight: {
        black: '800',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'), // Optional: run `npm install tailwindcss-animate --legacy-peer-deps` if you want built-in animations
  ],
}
