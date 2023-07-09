/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: { min: "320px", max: "540px" },
      md: { min: "541px", max: "1200px" },
    },
  },
  plugins: [],
};
