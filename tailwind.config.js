/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          lime: '#bef264', // The main lime color
          dark: '#1f2937', // Dark text
          green: '#4ade80', // Secondary green
        }
      },
    },
  },
  plugins: [],
}
