import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        main: "#6A42C2",
        title: "#262626",
        'dark-title': "#ffffff",
        primary: {
          DEFAULT: '#6366f1',
          hover: '#4f46e5',
        },
        secondary: {
          DEFAULT: '#ffffff',
          hover: '#f3f4f6',
        },
        success: "#859F3D",
        error: "#F95454",
        bglayout: "#262626",
        'dark-primary': {
          DEFAULT: '#818cf8',
          hover: '#6366f1',
        },
        'dark-secondary': {
          DEFAULT: '#1f2937',
          hover: '#374151',
        },
      },
    },
  },
  plugins: [],
};

export default config;
