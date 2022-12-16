/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        deepBlue: {
          900: "#040720"
        }
      },
      animation: {
        popup: "popup .3s ease-in-out"
      },
      keyframes: {
        popup: {
          "0%": { transform: "scale(0)" },
          "75%": { transform: "scale(1.2)" },
          "100%": { transform: "scale(1)" },
        }
      }
    },
  },
  plugins: [],
}
