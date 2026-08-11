import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        huddle: {
          bg: "#fffdf7",
          cream: "#fff9e6",
          sidebar: "rgba(255, 237, 224, 0.56)",
          sidebarBorder: "#f5efeb",
          gold: "#ffbf00",
          goldDark: "#c59609",
          goldLight: "rgba(255, 191, 0, 0.08)",
          goldBorder: "rgba(255, 191, 0, 0.2)",
          green: "#00d492",
          greenLight: "rgba(0, 188, 125, 0.1)",
          navy: "#001f3f",
          dark: "#242220",
          muted: "#929292",
          blue: "#3160e3",
          blueLight: "rgba(26, 78, 224, 0.2)",
        },
        brand: {
          50: "#fffbeb",
          100: "#fef3c7",
          200: "#fde68a",
          300: "#fcd34d",
          400: "#fbbf24",
          500: "#ffbf00",
          600: "#f59e0b",
          700: "#d97706",
          800: "#b45309",
          900: "#78350f",
          950: "#451a03",
        },
        surface: {
          50: "#fffdf7",
          100: "#fbf6ed",
          200: "#f5efeb",
          300: "#e8ded8",
          400: "#929292",
          500: "#65636d",
          600: "#432c2c",
          700: "#33302e",
          800: "#242220",
          900: "#181615",
          950: "#0c0b0a",
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "DM Sans",
          "Plus Jakarta Sans",
          "Roboto",
          "-apple-system",
          "sans-serif",
        ],
        heading: ["Inter", "sans-serif"],
        dmsans: ["DM Sans", "sans-serif"],
        jakarta: ["Plus Jakarta Sans", "sans-serif"],
      },
      boxShadow: {
        card: "0px 10px 15px -3px rgba(0,0,0,0.05), 0px 4px 6px -4px rgba(0,0,0,0.05)",
        goldGlow: "0px 4px 20px rgba(255, 191, 0, 0.25)",
        subtle: "0px 1px 2px rgba(0, 0, 0, 0.05)",
      },
      backdropBlur: {
        sidebar: "80px",
      },
    },
  },
  plugins: [],
};

export default config;
