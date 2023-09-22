import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    colors: {
      transparent: colors.transparent,
      white: colors.white,
      black: colors.black,
      grey: colors.gray,
      green: colors.green,
      red: colors.red,
      primary: colors.indigo,
      warning: colors.orange[600],
      error: colors.red[500],
    },
    extend: {
      screens: {
        xs: "460px",
      },
    },
  },
  plugins: [],
};

export default config;
