/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          dark: '#1e3a8a', // bleu foncé
          DEFAULT: '#3b82f6', // bleu
          light: '#93c5fd', // bleu clair
        },
        secondary: {
          dark: '#5b21b6', // violet foncé
          DEFAULT: '#8b5cf6', // violet
          light: '#c4b5fd', // violet clair
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
    },
  },
  plugins: [],
}
