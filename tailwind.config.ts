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
        tasti: {
          black: "#0a0a0a",
          "black-soft": "#111111",
          dark: "#1a1a1a",
          card: "#1c1c1c",
          border: "#2a2a2a",
          teal: "#00d4b8",
          "teal-dark": "#00b89f",
          "teal-glow": "rgba(0,212,184,0.15)",
          white: "#ffffff",
          "gray-1": "#f5f5f5",
          "gray-2": "#e5e5e5",
          "gray-3": "#a3a3a3",
          "gray-4": "#737373",
          "gray-5": "#404040",
          success: "#22c55e",
          warning: "#f59e0b",
          error: "#ef4444",
          info: "#3b82f6",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Cal Sans", "Inter", "sans-serif"],
      },
      backgroundImage: {
        "tasti-gradient": "linear-gradient(135deg, #00d4b8 0%, #0a0a0a 100%)",
        "card-gradient": "linear-gradient(145deg, #1c1c1c 0%, #111111 100%)",
        "glow-teal": "radial-gradient(circle at center, rgba(0,212,184,0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        "teal-glow": "0 0 30px rgba(0,212,184,0.2)",
        card: "0 1px 3px rgba(0,0,0,0.5), 0 1px 2px rgba(0,0,0,0.6)",
        "card-hover": "0 4px 12px rgba(0,0,0,0.6)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "fade-in": "fadeIn 0.3s ease-in-out",
        "slide-up": "slideUp 0.3s ease-out",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { transform: "translateY(8px)", opacity: "0" }, "100%": { transform: "translateY(0)", opacity: "1" } },
      },
    },
  },
  plugins: [],
};

export default config;
