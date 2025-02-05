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
      },
      keyframes: {
        "fold-top": {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(90deg)" },
        },
        "unfold-top": {
          "0%": { transform: "rotateX(90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
        "fold-bottom": {
          "0%": { transform: "rotateX(0deg)" },
          "100%": { transform: "rotateX(-90deg)" },
        },
        "unfold-bottom": {
          "0%": { transform: "rotateX(-90deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
      },
      animation: {
        "fold-top": "fold-top 0.5s ease-in-out forwards",
        "unfold-top": "unfold-top 0.5s ease-in-out forwards",
        "fold-bottom": "fold-bottom 0.5s ease-in-out forwards",
        "unfold-bottom": "unfold-bottom 0.5s ease-in-out forwards",
      },
    },
  },
  plugins: [
    function ( {addUtilities} ){
      addUtilities({
        ".scrollbar-none": {
          /* Hide scrollbar for Chrome, Safari, and Edge */
          "&::-webkit-scrollbar": {
            display: "none",
          },
          /* Hide scrollbar for Firefox */
          "&": {
            scrollbarWidth: "none",
          },
          /* Hide scrollbar for IE/Edge */
          "-ms-overflow-style": "none",
        },
      })
    },
  ],
}

