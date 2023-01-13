const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      grey: colors.gray,
      red: colors.red,
      primary: colors.indigo,
      error: colors.red[500],
    },
    extend: {
      screens: {
        xs: "384px",
      },
    },
  },
  plugins: [],
};
