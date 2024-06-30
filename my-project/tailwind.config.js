/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    "./src/**/*.{js,ts,jsx,tsx,mdx}",

  ],
  theme: {
    fontFamily:{
     'poppins': ['Poppins','sans-serif']
    },
   
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        main:'#d1336d',
        secondary:'#cdf4d2',
        accent:'#2dc88f',
        background:'#FFFFFF',
        text:'#000000',
      },
      
    },
  },
  plugins: [],
}
