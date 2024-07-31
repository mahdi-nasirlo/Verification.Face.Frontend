import type { Config } from "tailwindcss";
import CustomTheme from "./src/theme/custom-theme";

const colors = require("tailwindcss/colors");

const config: Config = {
  important: true,
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layouts/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      borderColor: {
        primary: CustomTheme.token?.colorPrimary,
        ...colors,
      },
      colors: {
        ...colors,
        primary: "#434347",
        secondary: CustomTheme.token?.colorPrimary,
      },
      backgroundColor: {
        ...colors,
        primary: CustomTheme.token?.colorPrimary,
        secondary: "#F5F5F6",
      },
      backgroundImage: {
        network: "url('/images/Vector.svg')",
      },
    },
  },
  plugins: [],
};
export default config;
