/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // primary color
        primary: "#49626A",
        // dark color
        dark: "#2E3133",
        //light
        light: "#A9B4AD",
        // danger color (red)
        danger: "#DA4432",
        // light and dark shades of grey
        lightGrey: "#EAEAEA",
        darkGrey: "#7f7e90",
      },
    },
    fontFamily: {
      montserrat: ["Montserrat", "sans-serif"],
    },
  },
  plugins: [],
};

export default config;
