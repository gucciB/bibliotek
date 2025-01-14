/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        loginBack: '#E9ECE9',
      },
      fontFamily:{
        'DMsans': ['"DM Sans"', 'sans-serif'],
        'gochi': ['"Gochi Hand"', 'cursive'],
      },
      boxShadow:{
        'top-bottom': 'inset 0px 5px 20px rgba(161, 161, 170, 0.1), inset -0px -5px 20px rgba(161, 161, 170, 0.1)',
      }
    },
  },
  plugins: [],
}

