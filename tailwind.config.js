const colors = require('tailwindcss/colors')

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
          DEFAULT: '#6200ee',
          dark: '#bb86fc'
        },
        'primary-variant': {
          DEFAULT: '#3700b3',
          dark: '#3700b3'
        },
        secondary: {
          DEFAULT: '#03dac6',
        },
        surface: {
          DEFAULT: '#ffffff',
          dark: '#121212',
        },
        error: {
          DEFAULT: '#b00020',
          dark: '#cf6679',
        },
      }
    },
  },
  plugins: [],
}
