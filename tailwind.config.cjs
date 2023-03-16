/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'poppins': ['"Poppins"', 'sans-serif'],
      },
      scale: {
        '102': '1.02'
      },
      maxWidth: {
        'btn' : '12rem'
      }
  },
  },
  plugins: [
    require('tailwind-scrollbar'),
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/line-clamp'),
],
}
