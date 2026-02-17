import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          50: "#ecf6ff",
          100: "#d9edff",
          200: "#b3dbff",
          300: "#8cc8ff",
          400: "#66b6ff",
          500: "#4091ff",
          600: "#3372cc",
          700: "#265499",
          800: "#1a3666",
          900: "#0d1a33",
        },
        accent: {
          50: "#fdf4ff",
          100: "#f8e8ff",
          200: "#f1d1ff",
          300: "#e9b9ff",
          400: "#e0a2ff",
          500: "#d389ff",
          600: "#a96ecc",
          700: "#805399",
          800: "#563866",
          900: "#2b1c33",
        },
        success: "#22c55e",
        warning: "#facc15",
        danger: "#ef4444",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
        mono: ["var(--font-geist-mono)", ...fontFamily.mono],
      },
      boxShadow: {
        "card-sm": "0 8px 30px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
