/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        darkMode: "#212121",
        lightMode: "#e8e8e8",
      },
      backgroundColor: {
        darkMode: "#212121",
        lightMode: "#e8e8e8",
        sunYellow: "#FDB813",
        moonBlue: "#6E81BC",
      },
      borderColor: {
        lightMode: "#e8e8e8",
      },
      fontFamily: {
        cursive: ['"Dancing Script"', "cursive"],
      },
    },
    screens: {
      sm: { min: "300px", max: "540px" },
      md: { min: "541px", max: "1200px" },
    },
  },
  plugins: [],
};
