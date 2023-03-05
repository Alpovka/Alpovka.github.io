/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        jobzWhite: "#D1CFD2",
        jobzGreen: "#15C8BE",
        jobzDarkBlue: "#261A9D",
        jobzOrange: "#ED625E",
        jobzBlue: "#1325F0",
        jobzDarkPurple: "#290C67",
        jobzLightPurple: "#7758E7",
        jobzGrey: "#435555",
        jobzBlack: "#08090A",
        jobzYellow: "#A2FC52",
      },
      screens: {
        "FHD": "1720px",
        "4K": "2560px",
      },
      keyframes: {
        spin78236: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        wobble1: {
          "0%": { transform: 'translateY(0%)', transform: 'scale(1.2)', opacity: 1 },
          "100%": { transform: 'translateY(0%)', transform: 'scale(1.2)', opacity: 1 },
          "50%": { transform: 'translateY(-66%)', transform: 'scale(0.8)', opacity: 0.8 },
        },
        wobble2: {
          "0%": { transform: 'translateY(0%)', transform: 'scale(1.2)', opacity: 1 },
          "100%": { transform: 'translateY(0%)', transform: 'scale(1.2)', opacity: 1 },
          "50%": { transform: 'translateY(66%)', transform: 'scale(0.8)', opacity: 0.8 },
        }
      }
    },
    fontFamily: {
      titillium: ['Quicksand', "sans-serif"]
    }
  },
  plugins: [
    require("tailwind-scrollbar")
  ],
}
