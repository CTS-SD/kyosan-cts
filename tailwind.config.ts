import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      animation: {
        "grow-in": "grow-in ease-out 0.4s",
        shake: "shake ease-in-out 0.4s",
        pop: "pop ease-in-out 0.3s",
      },
      keyframes: {
        "grow-in": {
          "0%": {
            transform: "translateY(32px)",
            opacity: "0",
          },
          "100%": {
            transform: "scale(1)",
            opacity: "1",
          },
        },
        shake: {
          "0%, 100%": {
            transform: "translateX(0)",
          },
          "10%, 30%, 50%, 70%, 90%": {
            transform: "translateX(-6px)",
          },
          "20%, 40%, 60%, 80%": {
            transform: "translateX(6px)",
          },
        },
        pop: {
          "0%": {
            transform: "scale(0.9)",
          },
          "50%": {
            transform: "scale(1.05)",
          },
          "100%": {
            transform: "scale(1)",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;
