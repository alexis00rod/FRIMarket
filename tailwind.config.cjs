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
      minWidth: {
        'btn': '2.5rem'
      },
      maxWidth: {
        'btn-s' : '2.5rem',
        'btn-m' : 'max-content',
        'btn-l' : '12rem',
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
