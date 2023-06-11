/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: { min: "380px", max: "540px" },
      md: { min: "541px", max: "750px" },
    },
  },
  plugins: [],
};
