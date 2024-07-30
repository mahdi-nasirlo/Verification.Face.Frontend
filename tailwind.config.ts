import type { Config } from "tailwindcss";

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
      colors: {
        ...colors,
        primary: "#434347",
        secondary: "#0474C9",
      },
      backgroundColor: {
        ...colors,
        "primary-light": "#EDF1FE",
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
