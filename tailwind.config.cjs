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
        'btn': '2rem'
      },
      maxWidth: {
        // Button
        'btn-s' : '2rem',
        'btn-m' : 'max-content',
        'btn-l' : '15.625rem',
        // Product card
        'productCard-s': '20rem',
        'productCard-m': '43.438rem',
        'productCard-l': '100%'
      },
      minHeight: {
        'textarea': '7rem'
      },
      maxHeight: {
        'dropdown' : '12rem',
      }
  },
  },
  plugins: [
    require ( 'tailwind-scrollbar' ) ( {  nocompatible : true  } ) , 
    require('tw-elements/dist/plugin'),
    require('@tailwindcss/line-clamp'),
],
}
