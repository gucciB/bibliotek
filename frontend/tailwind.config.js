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
    },
  },
  plugins: [],
}

