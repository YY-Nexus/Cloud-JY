import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        // 品牌色彩
        brand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        // 自定义动画
        float: {
          "0%, 100%": {
            transform: "translateY(0px) rotate(0deg)",
          },
          "25%": {
            transform: "translateY(-10px) rotate(1deg)",
          },
          "50%": {
            transform: "translateY(-5px) rotate(-1deg)",
          },
          "75%": {
            transform: "translateY(-8px) rotate(0.5deg)",
          },
        },
        glow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.3)",
          },
          "50%": {
            boxShadow: "0 0 30px rgba(59, 130, 246, 0.6)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          from: {
            opacity: "0",
            transform: "translateY(10px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        slideInUp: {
          from: {
            opacity: "0",
            transform: "translateY(30px)",
          },
          to: {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // 自定义动画
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        shimmer: "shimmer 2s infinite",
        fadeIn: "fadeIn 0.6s ease-out",
        slideInUp: "slideInUp 0.8s ease-out",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "brand-gradient": "linear-gradient(135deg, #3b82f6, #06b6d4, #8b5cf6)",
        "education-pattern":
          "linear-gradient(45deg, rgba(59,130,246,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(59,130,246,0.1) 25%, transparent 25%), linear-gradient(45deg, transparent 75%, rgba(59,130,246,0.1) 75%), linear-gradient(-45deg, transparent 75%, rgba(59,130,246,0.1) 75%)",
      },
      backgroundSize: {
        pattern: "20px 20px",
      },
      boxShadow: {
        glow: "0 0 20px rgba(59, 130, 246, 0.3)",
        "glow-lg": "0 0 30px rgba(59, 130, 246, 0.4)",
        neon: "0 0 5px currentColor, 0 0 10px currentColor, 0 0 15px currentColor",
        "3xl": "0 35px 60px -12px rgba(0, 0, 0, 0.25)",
      },
      backdropBlur: {
        xs: "2px",
      },
      fontFamily: {
        sans: ["Inter", "Noto Sans SC", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config
