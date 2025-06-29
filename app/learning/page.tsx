"use client"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import MultimediaTeaching from "@/components/multimedia-teaching"
import MathCompetitionTrainer from "@/components/math-competition-trainer"
import ArtisticCultivation from "@/components/artistic-cultivation"
import { BookOpen, Calculator, Palette, Globe, Star, Brain, Target, Zap, Crown } from "lucide-react"
import { BrandLogo } from "@/components/brand/brand-logo"
import { BrandSlogan } from "@/components/brand/brand-slogan"

// 模拟数据
const sampleMultilingualContent = {
  id: "1",
  title: {
    classical_chinese: "《论语·学而》",
    modern_chinese: "论语·学而篇",
    english: "The Analects - Chapter 1",
    japanese: "論語・学而",
    korean: "논어·학이",
    russian: "Аналекты Конфуция - Глава 1",
  },
  content: {
    classical_chinese: '子曰："学而时习之，不亦说乎？有朋自远方来，不亦乐乎？人不知而不愠，不亦君子乎？"',
    modern_chinese:
      '孔子说："学习知识并且按时复习，不是很愉快的事情吗？有朋友从远方来访，不是很快乐的事情吗？别人不了解我，我却不怨恨，不也是君子的品德吗？"',
    english:
      'Confucius said: "Is it not a pleasure, having learned something, to try it out at due intervals? Is it not a joy to have friends come from afar? Is it not gentlemanly not to take offense when others fail to appreciate your abilities?"',
    japanese:
      "孔子は言った：「学んで時々これを習う、また悦ばしからずや。朋有り遠方より来る、また楽しからずや。人知らずして慍みず、また君子ならずや。」",
    korean:
      '공자께서 말씀하셨다: "배우고 때때로 익히면 또한 기쁘지 아니한가? 벗이 먼 곳에서 찾아오니 또한 즐겁지 아니한가? 남이 알아주지 않아도 원망하지 않으니 또한 군자답지 아니한가?"',
    russian:
      'Конфуций сказал: "Разве не радостно изучать и постоянно упражняться в изученном? Разве не приятно, когда друзья приезжают издалека? Разве не благородно не сердиться, когда тебя не понимают?"',
  },
  audioUrls: {
    classical_chinese: "/audio/lunyu-classical.mp3",
    modern_chinese: "/audio/lunyu-modern.mp3",
    english: "/audio/lunyu-english.mp3",
    japanese: "/audio/lunyu-japanese.mp3",
    korean: "/audio/lunyu-korean.mp3",
    russian: "/audio/lunyu-russian.mp3",
  },
  videoUrl: "/videos/confucius-teaching.mp4",
  difficulty: 6,
  culturalContext:
    "《论语》是记录孔子及其弟子言行的重要典籍，体现了儒家思想的核心理念。这段话强调了学习的重要性、友谊的珍贵以及君子的品格修养，是中华文化中关于教育和人格培养的经典表述。",
  subject: "国学经典",
}

const sampleMathProblems = [
  {
    id: "1",
    title: "数论综合题",
    content: "设正整数n满足：对于任意正整数k，如果k²≡1(mod n)，则k≡±1(mod n)。求所有满足条件的n的值。",
    difficulty: 9,
    competitionLevel: "国际级",
    competitionName: "IMO国际数学奥林匹克",
    competitionYear: 2023,
    mathTopic: "数论",
    timeLimit: 45,
    solution: {
      steps: [
        "分析题目条件：k²≡1(mod n) ⟹ k≡±1(mod n)",
        "这等价于说n的所有二次剩余只有1",
        "考虑n的素因数分解，设n = p₁^a₁ × p₂^a₂ × ... × pₘ^aₘ",
        "对每个素数幂pᵢ^aᵢ分别分析",
        "当p为奇素数时，需要pᵢ^aᵢ = 1或pᵢ^aᵢ = 2",
        "当p = 2时，需要2^a = 1, 2, 4, 或8",
        "综合所有情况，得到n的所有可能值",
      ],
      methods: ["数论分析", "素因数分解", "二次剩余理论"],
      keyInsights: ["关键是理解二次剩余的性质", "需要分别考虑奇素数和2的情况", "利用中国剩余定理的思想"],
      commonMistakes: ["忽略了n=1的情况", "没有考虑2的幂次的特殊性", "遗漏了某些可能的组合"],
    },
    points: 7,
  },
]

const sampleArtisticWorks = [
  {
    id: "1",
    type: "poetry" as const,
    title: "静夜思",
    content: "床前明月光，\n疑是地上霜。\n举头望明月，\n低头思故乡。",
    author: "李白",
    period: "唐代",
    culturalSignificance:
      "这首诗是李白的代表作之一，以简洁明快的语言表达了游子思乡的深切情感。诗中通过对比明月光与地上霜，营造出清冷寂静的夜晚氛围，体现了中国古典诗歌含蓄内敛的美学特征。",
    learningObjectives: [
      "理解古典诗歌的意象运用",
      "体会思乡情感的表达方式",
      "学习诗歌的韵律和节奏",
      "感受中华文化的情感内涵",
    ],
    appreciationGuide:
      '这首诗运用了对比和联想的手法，"明月光"与"地上霜"的视觉对比，"举头"与"低头"的动作对比，都增强了诗歌的表现力。全诗语言朴素自然，却蕴含着深刻的情感，体现了李白诗歌"清水出芙蓉，天然去雕饰"的艺术风格。',
  },
]

export default function LearningPage() {
  const { user, profile } = useAuth()
  const [currentLanguage, setCurrentLanguage] = useState("modern_chinese")
  const [activeModule, setActiveModule] = useState("multimedia")

  const handleLanguageChange = (language: string) => {
    setCurrentLanguage(language)
  }

  const handleProgressUpdate = (progress: number) => {
    console.log("学习进度更新:", progress)
  }

  const handleSubmitMathAnswer = (problemId: string, answer: string, timeSpent: number) => {
    console.log("提交数学答案:", { problemId, answer, timeSpent })
  }

  const handleRequestMathHint = (problemId: string) => {
    console.log("请求数学提示:", problemId)
  }

  const handleSubmitArtCreation = (type: string, content: string) => {
    console.log("提交艺术创作:", { type, content })
  }

  const handleRequestArtFeedback = (workId: string, userWork: string) => {
    console.log("请求艺术反馈:", { workId, userWork })
  }

  if (!user || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 顶部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <BrandLogo size="md" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">言语云³ 智能教育平台</h1>
                <p className="text-xs text-gray-500">YYC³-DeepStack · 传承文化 · 携手智能 · 冲刺985</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Target className="h-3 w-3" />
                目标：{profile.role === "student" ? "985/211" : "培养学霸"}
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                多语言教学
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎横幅 */}
        <Card className="mb-8 bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 text-white">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <BrandSlogan language="chinese" size="lg" className="text-white" />
              <BrandSlogan language="english" size="md" className="text-blue-100" />
              <div className="flex justify-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4" />
                  <span>985超越211</span>
                </div>
                <div className="flex items-center gap-2">
                  <Brain className="h-4 w-4" />
                  <span>AI智能辅导</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>多语化教学</span>
                </div>
                <div className="flex items-center gap-2">
                  <Palette className="h-4 w-4" />
                  <span>文艺赋能</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 学习模块选择 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl">选择学习模块</CardTitle>
            <CardDescription>全方位培养，多维度提升，助您走向中国最高端学府</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Button
                variant={activeModule === "multimedia" ? "default" : "outline"}
                className="h-24 flex-col gap-2"
                onClick={() => setActiveModule("multimedia")}
              >
                <BookOpen className="h-8 w-8" />
                <div className="text-center">
                  <div className="font-semibold">多语言教学</div>
                  <div className="text-xs text-gray-500">古文·现代·多国语言</div>
                </div>
              </Button>

              <Button
                variant={activeModule === "math" ? "default" : "outline"}
                className="h-24 flex-col gap-2"
                onClick={() => setActiveModule("math")}
              >
                <Calculator className="h-8 w-8" />
                <div className="text-center">
                  <div className="font-semibold">奥数竞赛</div>
                  <div className="text-xs text-gray-500">国际标准·竞赛训练</div>
                </div>
              </Button>

              <Button
                variant={activeModule === "arts" ? "default" : "outline"}
                className="h-24 flex-col gap-2"
                onClick={() => setActiveModule("arts")}
              >
                <Palette className="h-8 w-8" />
                <div className="text-center">
                  <div className="font-semibold">文艺素养</div>
                  <div className="text-xs text-gray-500">诗词·书法·文化传承</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 学习内容区域 */}
        <div className="space-y-8">
          {activeModule === "multimedia" && (
            <MultimediaTeaching
              content={sampleMultilingualContent}
              currentLanguage={currentLanguage}
              onLanguageChange={handleLanguageChange}
              onProgressUpdate={handleProgressUpdate}
            />
          )}

          {activeModule === "math" && (
            <MathCompetitionTrainer
              problems={sampleMathProblems}
              onSubmitAnswer={handleSubmitMathAnswer}
              onRequestHint={handleRequestMathHint}
            />
          )}

          {activeModule === "arts" && (
            <ArtisticCultivation
              works={sampleArtisticWorks}
              onSubmitCreation={handleSubmitArtCreation}
              onRequestFeedback={handleRequestArtFeedback}
            />
          )}
        </div>

        {/* 底部激励语 */}
        <Card className="mt-12 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <div className="flex justify-center">
                <BrandLogo size="lg" variant="icon" />
              </div>
              <BrandSlogan showBoth size="lg" />
              <p className="text-amber-700 max-w-2xl mx-auto">
                在您孜孜不倦的引导传递下，学生定不辱使命，走向中国最高端学府或走美国。 万象归元于云枢，言语智启新纪元！
              </p>
              <div className="flex justify-center gap-4 pt-4">
                <Badge className="bg-amber-100 text-amber-800 px-4 py-2">
                  <Zap className="h-4 w-4 mr-2" />
                  AI智能导师
                </Badge>
                <Badge className="bg-amber-100 text-amber-800 px-4 py-2">
                  <Star className="h-4 w-4 mr-2" />
                  985/211冲刺
                </Badge>
                <Badge className="bg-amber-100 text-amber-800 px-4 py-2">
                  <Crown className="h-4 w-4 mr-2" />
                  文化传承
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
