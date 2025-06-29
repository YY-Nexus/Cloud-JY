import { BRAND_CONFIG } from "./brand-config"

// 基于品牌色彩的主题配置
export const themeConfig = {
  // CSS 变量
  cssVariables: {
    "--brand-primary": "59 130 246", // blue-500
    "--brand-secondary": "14 165 233", // sky-500
    "--brand-accent": "168 85 247", // purple-500
    "--brand-gradient-from": "59 130 246",
    "--brand-gradient-via": "14 165 233",
    "--brand-gradient-to": "168 85 247",
  },

  // Tailwind 扩展
  tailwindExtend: {
    colors: {
      brand: BRAND_CONFIG.colors.primary,
      "brand-secondary": BRAND_CONFIG.colors.secondary,
    },
    backgroundImage: {
      "brand-gradient": `linear-gradient(135deg, ${BRAND_CONFIG.colors.gradient.primary})`,
      "brand-gradient-secondary": `linear-gradient(135deg, ${BRAND_CONFIG.colors.gradient.secondary})`,
      "brand-gradient-accent": `linear-gradient(135deg, ${BRAND_CONFIG.colors.gradient.accent})`,
    },
    fontFamily: {
      brand: ["Inter", "Noto Sans SC", "sans-serif"],
    },
    animation: {
      "brand-pulse": "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      "brand-bounce": "bounce 1s infinite",
    },
  },
}

// 导出主题工具函数
export const getThemeClass = (variant: "primary" | "secondary" | "accent" = "primary") => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-cyan-500",
    secondary: "bg-gradient-to-r from-cyan-400 to-blue-500",
    accent: "bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500",
  }
  return variants[variant]
}

export const getTextGradientClass = (variant: "primary" | "secondary" | "accent" = "primary") => {
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent",
    secondary: "bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent",
    accent: "bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 bg-clip-text text-transparent",
  }
  return variants[variant]
}
