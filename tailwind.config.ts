import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#eff8ff",
          100: "#dbeffe",
          200: "#bee3fd",
          300: "#91d2fc",
          400: "#5db8f9",
          500: "#3a9af5",
          600: "#1e7de9",
          700: "#1665d0",
          800: "#1952a9",
          900: "#1a4785",
          950: "#142c52",
        },
      },
    },
  },
  plugins: [],
};
export default config;
