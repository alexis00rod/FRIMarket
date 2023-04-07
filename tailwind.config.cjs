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
      height: {
        'btn': '2rem',
      },
      minWidth: {
        'xs': '20rem',
        // Menu
        'menu': '17.5rem',
        // Button
        'btn': '2rem',
        // Select
        'select': '13.75rem',
        // Card
        'card': '13.75rem',
      },
      maxWidth: {
        // Button
        'btn-s' : '2rem',
        'btn-m' : 'max-content',
        'btn-l' : '13.75rem',
        // Product card
        'productCard-s': '20rem',
        'productCard-m': '43.438rem',
        'productCard-l': '100%',
        // Select
        'select' : '17.5rem',
        // Input
        'input-s':'11.25rem',
        'input-m':'17.5rem',
        'input-l':'100%',
      },
      minHeight: {
        'textarea': '7rem',
      },
      maxHeight: {
        'dropdown' : '12rem',
        // Button
        'btn': '2rem',
      }
  },
  },
  plugins: [
    require ( 'tailwind-scrollbar' ) ( {  nocompatible : true  } ) , 
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/line-clamp'),
],
}
