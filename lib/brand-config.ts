// 言语云³ 品牌配置
export const BRAND_CONFIG = {
  // 品牌名称
  name: {
    chinese: "言语云³",
    english: "YanYu Intelligent Cloud³ DeepStack Education Platform",
    abbreviation: "YYC³-DeepStack",
  },

  // 品牌标语
  slogan: {
    chinese: "万象归元于云枢；言语智启新纪元",
    english: "All things converge to the Cloud Pivot; YanYu's wisdom ignites a new epoch.",
  },

  // Logo配置
  logo: {
    main: "/images/yanyu-logo.png",
    favicon: "/images/yanyu-logo.png",
    width: 40,
    height: 40,
  },

  // 品牌色彩
  colors: {
    primary: {
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
    secondary: {
      50: "#f0f9ff",
      100: "#e0f2fe",
      200: "#bae6fd",
      300: "#7dd3fc",
      400: "#38bdf8",
      500: "#0ea5e9",
      600: "#0284c7",
      700: "#0369a1",
      800: "#075985",
      900: "#0c4a6e",
    },
    gradient: {
      primary: "from-blue-600 via-cyan-500 to-blue-700",
      secondary: "from-cyan-400 via-blue-500 to-indigo-600",
      accent: "from-blue-500 via-purple-500 to-cyan-500",
    },
  },

  // 教育理念
  philosophy: {
    chinese: "传承文化、携手智能、冲刺985",
    english: "Heritage Culture, AI-Powered, Elite Universities",
  },

  // 核心价值
  values: ["智能化教学", "个性化学习", "文化传承", "国际视野", "创新思维"],

  // 目标用户
  targetUsers: ["学生", "教师", "家长"],

  // 技术特色
  techFeatures: ["AI智能导师", "多语言教学", "云端计算", "深度学习", "实时互动"],
}

// 获取品牌信息的工具函数
export const getBrandName = (type: "chinese" | "english" | "abbreviation" = "chinese") => {
  return BRAND_CONFIG.name[type]
}

export const getBrandSlogan = (language: "chinese" | "english" = "chinese") => {
  return BRAND_CONFIG.slogan[language]
}

export const getBrandLogo = () => {
  return BRAND_CONFIG.logo
}

export const getBrandColors = () => {
  return BRAND_CONFIG.colors
}
