import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          black: "#171717",
          blush: "#F8E8EC",
          cream: "#FFF9F5",
          white: "#FFFFFF",
          gold: "#C9A227",
          text: "#171717",
          muted: "#6B7280",
          border: "#E5E7EB",
        },
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        luxury: "0 8px 32px rgba(212, 175, 55, 0.12)",
        "luxury-lg": "0 20px 60px rgba(212, 175, 55, 0.18)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.08)",
        "glass-lg": "0 20px 60px rgba(0, 0, 0, 0.12)",
        card: "0 2px 20px rgba(0, 0, 0, 0.06)",
        "card-hover": "0 8px 40px rgba(0, 0, 0, 0.12)",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
        "slide-in-left": "slideInLeft 0.6s ease-out forwards",
        shimmer: "shimmer 2s infinite linear",
        float: "float 3s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        marquee: "marquee 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-30px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "gold-gradient": "linear-gradient(135deg, #D4AF37 0%, #E8C84A 50%, #B8960A 100%)",
        "dark-gradient": "linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)",
        "pink-gradient": "linear-gradient(135deg, #F8D7E8 0%, #F0A8C8 100%)",
        "luxury-gradient":
          "linear-gradient(135deg, #000000 0%, #1a1a1a 40%, #2d2d2d 100%)",
        shimmer:
          "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.4) 50%, transparent 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
