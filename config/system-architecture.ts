// 系统架构配置
export const SYSTEM_CONFIG = {
  // 支持的语言体系
  LANGUAGES: {
    CHINESE_CLASSICAL: "classical_chinese", // 古文学
    CHINESE_MODERN: "modern_chinese", // 现代汉语
    ENGLISH: "english", // 英语
    JAPANESE: "japanese", // 日语
    KOREAN: "korean", // 韩语
    RUSSIAN: "russian", // 俄语
  },

  // 学科体系
  SUBJECTS: {
    LANGUAGE_ARTS: "language_arts", // 语言文学
    MATHEMATICS: "mathematics", // 数学（含奥数）
    SCIENCES: "sciences", // 理科
    HUMANITIES: "humanities", // 人文社科
    ARTS: "arts", // 文艺素养
    INTERNATIONAL: "international", // 国际课程
  },

  // 教学模式
  TEACHING_MODES: {
    AI_TUTOR: "ai_tutor", // AI导师
    VOICE_TEACHING: "voice_teaching", // 语音教学
    VIDEO_GENERATION: "video_generation", // 视频生成
    INTERACTIVE_PRACTICE: "interactive", // 互动练习
    CULTURAL_IMMERSION: "cultural", // 文化浸润
  },

  // 目标院校等级
  TARGET_LEVELS: {
    TOP_985: "top_985", // 顶尖985
    REGULAR_985: "regular_985", // ���通985
    TOP_211: "top_211", // 顶尖211
    INTERNATIONAL: "international", // 国际名校
  },
}

// 多语言内容类型定义
export interface MultiLanguageContent {
  id: string
  title: Record<string, string> // 多语言标题
  content: Record<string, string> // 多语言内容
  audio_urls: Record<string, string> // 多语言音频
  video_urls: Record<string, string> // 多语言视频
  difficulty_level: number // 难度等级 1-10
  cultural_context?: string // 文化背景
  learning_objectives: string[] // 学习目标
}

// AI教学配置
export interface AITeachingConfig {
  personality: "strict" | "gentle" | "encouraging" | "scholarly"
  teaching_style: "traditional" | "modern" | "international"
  language_preference: string
  cultural_emphasis: boolean
  difficulty_adaptation: boolean
}
