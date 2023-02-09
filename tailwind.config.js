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
        jobzDarkBlue: "#1325F0",
        jobzOrange: "#ED625E",
        jobzBlue: "#1325F0",
        jobzDarkPurple: "#290C67",
        jobzLightPurple: "#7758E7",
        jobzGrey: "#435555",
        jobzBlack: "#08090A",
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
