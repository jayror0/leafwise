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
        // Botanical Greens
        sage: {
          50: "#f6f8f3",
          100: "#e9f0e2",
          200: "#d4e2c7",
          300: "#b5cea1",
          400: "#9CAF88",
          500: "#768763",
          600: "#5d6b4d",
          700: "#4a5540",
          800: "#3d4535",
          900: "#343a2e",
        },
        forest: {
          50: "#f2f4f0",
          100: "#e2e6dd",
          200: "#c5cdbc",
          300: "#a1ad93",
          400: "#7d8a6b",
          500: "#606e50",
          600: "#4A5D3A",
          700: "#3e4a32",
          800: "#343d2b",
          900: "#2d3427",
        },
        moss: {
          50: "#f5f7f2",
          100: "#e8ede1",
          200: "#d2dbc4",
          300: "#b4c29e",
          400: "#8B956D",
          500: "#738057",
          600: "#5a6545",
          700: "#4a5039",
          800: "#3e4231",
          900: "#35392c",
        },
        // Earthy Botanicals
        terracotta: {
          50: "#fef4e8",
          100: "#fce4c3",
          200: "#f9c78a",
          300: "#f5a447",
          400: "#f1861a",
          500: "#C65D07",
          600: "#b84a05",
          700: "#983608",
          800: "#7c2c0c",
          900: "#65240d",
        },
        "warm-beige": "#F5F5DC",
        cream: "#FDF6E3",
        linen: "#FAF0E6",
        // Boho Tones
        "dusty-rose": "#D4A4A4",
        mauve: "#E0B4B7",
        "sunset-orange": "#E07B39",
        "golden-yellow": "#F4D03F",
        "lavender-gray": "#B8A9C9",
        // Rustic Wood & Stone
        driftwood: "#8B7355",
        "weathered-wood": "#A0826D",
        "stone-gray": "#8E8E93",
        parchment: "#F4F1DE",
      },
      fontFamily: {
        botanical: ["Merriweather", "serif"],
        "boho-script": ["Dancing Script", "cursive"],
        rustic: ["Playfair Display", "serif"],
        nature: ["Crimson Text", "serif"],
        earthy: ["Cormorant Garamond", "serif"],
      },
      backgroundImage: {
        "botanical-gradient":
          "linear-gradient(135deg, #FDF6E3 0%, #FAF0E6 20%, #F5F5DC 40%, #F4F1DE 60%, #FAF0E6 80%, #FDF6E3 100%)",
        "sage-gradient":
          "linear-gradient(135deg, #9CAF88 0%, #8B956D 50%, #4A5D3A 100%)",
        "nature-radial":
          "radial-gradient(ellipse at center, rgba(156, 175, 136, 0.1) 0%, transparent 50%)",
      },
      boxShadow: {
        botanical:
          "0 8px 32px rgba(74, 93, 58, 0.1), 0 4px 16px rgba(156, 175, 136, 0.15)",
        mystical:
          "0 0 20px rgba(156, 175, 136, 0.4), 0 0 40px rgba(156, 175, 136, 0.2)",
        nature:
          "0 15px 35px rgba(74, 93, 58, 0.15), 0 8px 20px rgba(156, 175, 136, 0.1)",
      },
    },
  },
  plugins: [],
};
export default config;