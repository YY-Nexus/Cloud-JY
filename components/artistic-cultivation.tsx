"use client"

import React, { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Palette,
  Music,
  BookOpen,
  Feather,
  Brush,
  Heart,
  Star,
  Award,
  Eye,
  Lightbulb,
  Sparkles,
  Crown,
  Flower,
} from "lucide-react"

interface ArtisticWork {
  id: string
  type: "poetry" | "calligraphy" | "painting" | "music" | "literature"
  title: string
  content: string
  author: string
  period: string
  culturalSignificance: string
  learningObjectives: string[]
  appreciationGuide: string
}

interface ArtisticCultivationProps {
  works: ArtisticWork[]
  onSubmitCreation: (type: string, content: string) => void
  onRequestFeedback: (workId: string, userWork: string) => void
}

export default function ArtisticCultivation({ works, onSubmitCreation, onRequestFeedback }: ArtisticCultivationProps) {
  const [activeTab, setActiveTab] = useState("appreciation")
  const [selectedWork, setSelectedWork] = useState<ArtisticWork | null>(works[0] || null)
  const [userCreation, setUserCreation] = useState("")
  const [creationType, setCreationType] = useState<string>("poetry")
  const [showFeedback, setShowFeedback] = useState(false)
  const [currentFeedback, setCurrentFeedback] = useState("")

  const artTypes = {
    poetry: { name: "诗词创作", icon: Feather, color: "bg-purple-100 text-purple-800" },
    calligraphy: { name: "书法艺术", icon: Brush, color: "bg-blue-100 text-blue-800" },
    painting: { name: "绘画鉴赏", icon: Palette, color: "bg-green-100 text-green-800" },
    music: { name: "音乐理解", icon: Music, color: "bg-yellow-100 text-yellow-800" },
    literature: { name: "文学鉴赏", icon: BookOpen, color: "bg-red-100 text-red-800" },
  }

  const handleSubmitCreation = async () => {
    if (!userCreation.trim()) return

    setCurrentFeedback("AI导师正在评析您的作品...")
    setShowFeedback(true)
    onSubmitCreation(creationType, userCreation)

    // 模拟AI反馈
    setTimeout(() => {
      setCurrentFeedback(`
【作品评析】

技法评价：您的${artTypes[creationType as keyof typeof artTypes].name}展现了良好的基础功底，在表达技巧上有一定的造诣。

文化内涵：作品体现了对中华传统文化的理解和传承，具有深厚的文化底蕴。

创意表达：在传统基础上融入了个人的思考和感悟，展现了独特的艺术视角。

改进建议：
1. 可以进一步加强对古典文学的学习，丰富表达的层次
2. 注意节奏和韵律的把握，使作品更加和谐优美
3. 建议多读经典作品，提升文化素养和艺术品味

总体评分：8.5/10 分

继续保持这种学习热情，您的艺术修养必将更上一层楼！
      `)
    }, 3000)
  }

  const handleRequestFeedback = async (work: ArtisticWork) => {
    setCurrentFeedback("正在生成专业鉴赏指导...")
    setShowFeedback(true)
    onRequestFeedback(work.id, "")

    setTimeout(() => {
      setCurrentFeedback(`
【专业鉴赏指导】

作品背景：${work.culturalSignificance}

艺术特色：
- 技法精湛，体现了${work.period}时期的艺术特点
- 情感表达深刻，具有强烈的感染力
- 文化内涵丰富，承载着深厚的历史底蕴

鉴赏要点：
${work.appreciationGuide}

学习价值：
${work.learningObjectives.map((obj) => `• ${obj}`).join("\n")}

通过学习这件作品，您将深入理解中华文化的博大精深，提升自己的艺术修养和审美能力。
      `)
    }, 2000)
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-6">
      {/* 顶部标题 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-3xl mb-2 flex items-center gap-3">
                <Crown className="h-8 w-8 text-amber-600" />
                文艺素养培养系统
              </CardTitle>
              <CardDescription className="text-lg">传承千年文化 · 培养艺术品味 · 提升人文素养</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Sparkles className="h-3 w-3" />
                文化传承
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Heart className="h-3 w-3" />
                美育教育
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 主要内容区域 */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="appreciation" className="flex items-center gap-2">
            <Eye className="h-4 w-4" />
            艺术鉴赏
          </TabsTrigger>
          <TabsTrigger value="creation" className="flex items-center gap-2">
            <Lightbulb className="h-4 w-4" />
            创作实践
          </TabsTrigger>
          <TabsTrigger value="assessment" className="flex items-center gap-2">
            <Award className="h-4 w-4" />
            素养评估
          </TabsTrigger>
        </TabsList>

        {/* 艺术鉴赏 */}
        <TabsContent value="appreciation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* 作品列表 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">经典作品</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {works.map((work) => {
                  const ArtIcon = artTypes[work.type].icon
                  return (
                    <Button
                      key={work.id}
                      variant={selectedWork?.id === work.id ? "default" : "ghost"}
                      className="w-full justify-start h-auto p-3"
                      onClick={() => setSelectedWork(work)}
                    >
                      <div className="flex items-center gap-3">
                        <ArtIcon className="h-4 w-4" />
                        <div className="text-left">
                          <div className="font-medium text-sm">{work.title}</div>
                          <div className="text-xs text-gray-500">{work.author}</div>
                        </div>
                      </div>
                    </Button>
                  )
                })}
              </CardContent>
            </Card>

            {/* 作品详情 */}
            {selectedWork && (
              <Card className="lg:col-span-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl mb-2">{selectedWork.title}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <Badge className={artTypes[selectedWork.type].color}>{artTypes[selectedWork.type].name}</Badge>
                        <span>{selectedWork.author}</span>
                        <span>·</span>
                        <span>{selectedWork.period}</span>
                      </CardDescription>
                    </div>
                    <Button onClick={() => handleRequestFeedback(selectedWork)}>
                      <Eye className="h-4 w-4 mr-2" />
                      专业鉴赏
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* 作品内容 */}
                  <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-6 rounded-lg border-l-4 border-amber-400">
                    <div className="prose prose-lg max-w-none">
                      <div className="text-gray-800 leading-relaxed whitespace-pre-wrap font-serif">
                        {selectedWork.content}
                      </div>
                    </div>
                  </div>

                  {/* 文化意义 */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Flower className="h-5 w-5 text-pink-600" />
                      文化意义
                    </h4>
                    <p className="text-gray-700 leading-relaxed">{selectedWork.culturalSignificance}</p>
                  </div>

                  {/* 学习目标 */}
                  <div>
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-600" />
                      学习目标
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {selectedWork.learningObjectives.map((objective, index) => (
                        <li key={index} className="flex items-center gap-2 text-gray-700">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          {objective}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        {/* 创作实践 */}
        <TabsContent value="creation" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* 创作类型选择 */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">选择创作类型</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(artTypes).map(([type, info]) => {
                  const Icon = info.icon
                  return (
                    <Button
                      key={type}
                      variant={creationType === type ? "default" : "outline"}
                      className="w-full justify-start h-12"
                      onClick={() => setCreationType(type)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      {info.name}
                    </Button>
                  )
                })}
              </CardContent>
            </Card>

            {/* 创作区域 */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {React.createElement(artTypes[creationType as keyof typeof artTypes].icon, { className: "h-5 w-5" })}
                  {artTypes[creationType as keyof typeof artTypes].name}创作
                </CardTitle>
                <CardDescription>发挥您的创意，创作属于自己的艺术作品</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="creation">作品内容</Label>
                  <Textarea
                    id="creation"
                    placeholder={`请在此创作您的${artTypes[creationType as keyof typeof artTypes].name}作品...`}
                    value={userCreation}
                    onChange={(e) => setUserCreation(e.target.value)}
                    className="min-h-64 font-serif"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    onClick={handleSubmitCreation}
                    disabled={!userCreation.trim()}
                    className="flex items-center gap-2"
                  >
                    <Sparkles className="h-4 w-4" />
                    提交作品
                  </Button>

                  <Button variant="outline" onClick={() => setUserCreation("")}>
                    重新创作
                  </Button>
                </div>

                {/* 创作提示 */}
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h5 className="font-semibold mb-2 text-blue-800">创作提示</h5>
                  <div className="text-sm text-blue-700 space-y-1">
                    {creationType === "poetry" && (
                      <>
                        <p>• 注意平仄韵律，追求音韵之美</p>
                        <p>• 融入真情实感，表达内心感悟</p>
                        <p>• 借鉴古典意象，体现文化底蕴</p>
                      </>
                    )}
                    {creationType === "calligraphy" && (
                      <>
                        <p>• 描述您的书法作品构思和技法</p>
                        <p>• 体现汉字的结构美和笔画美</p>
                        <p>• 融入个人的理解和感悟</p>
                      </>
                    )}
                    {creationType === "literature" && (
                      <>
                        <p>• 构思完整的故事情节</p>
                        <p>• 塑造鲜明的人物形象</p>
                        <p>• 体现深刻的思想内涵</p>
                      </>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* 素养评估 */}
        <TabsContent value="assessment" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 各项能力评分 */}
            {[
              { name: "文学鉴赏", score: 85, icon: BookOpen, color: "text-blue-600" },
              { name: "诗词创作", score: 78, icon: Feather, color: "text-purple-600" },
              { name: "书法技能", score: 72, icon: Brush, color: "text-green-600" },
              { name: "文化素养", score: 88, icon: Crown, color: "text-amber-600" },
            ].map((skill) => (
              <Card key={skill.name}>
                <CardContent className="pt-6">
                  <div className="text-center space-y-3">
                    <skill.icon className={`h-8 w-8 mx-auto ${skill.color}`} />
                    <h3 className="font-semibold">{skill.name}</h3>
                    <div className="space-y-2">
                      <div className={`text-3xl font-bold ${skill.color}`}>{skill.score}</div>
                      <Progress value={skill.score} className="h-2" />
                      <p className="text-xs text-gray-500">满分100分</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* 综合评估报告 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                综合素养评估报告
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <div className="text-4xl font-bold text-blue-600 mb-2">81</div>
                  <div className="text-lg font-semibold text-gray-800">综合评分</div>
                  <div className="text-sm text-gray-600">优秀水平</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <div className="text-4xl font-bold text-green-600 mb-2">92%</div>
                  <div className="text-lg font-semibold text-gray-800">文化认同</div>
                  <div className="text-sm text-gray-600">深厚底蕴</div>
                </div>

                <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg">
                  <div className="text-4xl font-bold text-purple-600 mb-2">76</div>
                  <div className="text-lg font-semibold text-gray-800">创造力指数</div>
                  <div className="text-sm text-gray-600">良好表现</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2 text-green-700">优势领域</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      文学鉴赏能力强
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      文化底蕴深厚
                    </Badge>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      情感表达丰富
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-orange-700">提升方向</h4>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      书法技能待加强
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      创作技巧需提升
                    </Badge>
                    <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                      艺术视野可拓展
                    </Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2 text-blue-700">推荐活动</h4>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      参加诗词创作比赛，提升创作水平
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      学习书法基础，培养书写美感
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      参观博物馆和艺术展览，拓展艺术视野
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      阅读经典文学作品，提升文学素养
                    </li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* AI反馈弹窗 */}
      {showFeedback && (
        <Card className="fixed inset-4 z-50 bg-white shadow-2xl overflow-auto">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-purple-600" />
                AI导师点评
              </CardTitle>
              <Button variant="ghost" onClick={() => setShowFeedback(false)}>
                ✕
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none">
              <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{currentFeedback}</div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
