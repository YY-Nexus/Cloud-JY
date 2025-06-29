"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Trophy, Clock, Target, Brain, Lightbulb, CheckCircle, Star, Award, Calculator, Globe, Zap } from "lucide-react"

interface MathProblem {
  id: string
  title: string
  content: string
  difficulty: number
  competitionLevel: string
  competitionName: string
  competitionYear: number
  mathTopic: string
  timeLimit: number // 分钟
  solution: {
    steps: string[]
    methods: string[]
    keyInsights: string[]
    commonMistakes: string[]
  }
  points: number
}

interface MathCompetitionTrainerProps {
  problems: MathProblem[]
  onSubmitAnswer: (problemId: string, answer: string, timeSpent: number) => void
  onRequestHint: (problemId: string) => void
}

export default function MathCompetitionTrainer({
  problems,
  onSubmitAnswer,
  onRequestHint,
}: MathCompetitionTrainerProps) {
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [timeSpent, setTimeSpent] = useState(0)
  const [isTimerRunning, setIsTimerRunning] = useState(false)
  const [showSolution, setShowSolution] = useState(false)
  const [showHint, setShowHint] = useState(false)
  const [submittedAnswers, setSubmittedAnswers] = useState<Record<string, any>>({})
  const [currentHint, setCurrentHint] = useState("")

  const currentProblem = problems[currentProblemIndex]

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimeSpent((prev) => prev + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isTimerRunning])

  useEffect(() => {
    // 重置状态当切换题目时
    setUserAnswer("")
    setTimeSpent(0)
    setIsTimerRunning(false)
    setShowSolution(false)
    setShowHint(false)
    setCurrentHint("")
  }, [currentProblemIndex])

  const startTimer = () => {
    setIsTimerRunning(true)
  }

  const stopTimer = () => {
    setIsTimerRunning(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleSubmitAnswer = () => {
    stopTimer()
    const answerData = {
      answer: userAnswer,
      timeSpent,
      timestamp: new Date().toISOString(),
    }
    setSubmittedAnswers((prev) => ({
      ...prev,
      [currentProblem.id]: answerData,
    }))
    onSubmitAnswer(currentProblem.id, userAnswer, timeSpent)
    setShowSolution(true)
  }

  const handleRequestHint = async () => {
    setCurrentHint("正在生成提示...")
    setShowHint(true)
    onRequestHint(currentProblem.id)

    // 模拟AI生成提示
    setTimeout(() => {
      setCurrentHint(`
提示：这是一道${currentProblem.mathTopic}问题。

关键思路：
1. 仔细分析题目中的数量关系
2. 考虑使用${currentProblem.solution.methods[0]}方法
3. 注意${currentProblem.solution.keyInsights[0]}

记住：${currentProblem.solution.commonMistakes[0]}是常见错误，要避免。
      `)
    }, 2000)
  }

  const nextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex((prev) => prev + 1)
    }
  }

  const previousProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex((prev) => prev - 1)
    }
  }

  const getDifficultyColor = (difficulty: number) => {
    if (difficulty <= 3) return "bg-green-100 text-green-800"
    if (difficulty <= 6) return "bg-yellow-100 text-yellow-800"
    if (difficulty <= 8) return "bg-orange-100 text-orange-800"
    return "bg-red-100 text-red-800"
  }

  const getCompetitionLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case "省级":
        return "bg-blue-100 text-blue-800"
      case "国家级":
        return "bg-purple-100 text-purple-800"
      case "国际级":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!currentProblem) {
    return (
      <div className="text-center py-12">
        <Trophy className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-gray-600">暂无题目</h3>
        <p className="text-gray-500">请稍后再试</p>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* 顶部信息栏 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl mb-2 flex items-center gap-2">
                <Calculator className="h-6 w-6" />
                奥数竞赛训练系统
              </CardTitle>
              <CardDescription>国际标准 · 985/211冲刺 · 数学思维培养</CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="flex items-center gap-1">
                <Globe className="h-3 w-3" />
                国际标准
              </Badge>
              <Badge variant="secondary" className="flex items-center gap-1">
                <Zap className="h-3 w-3" />
                AI辅导
              </Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* 题目导航 */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                题目 {currentProblemIndex + 1} / {problems.length}
              </span>
              <Progress value={((currentProblemIndex + 1) / problems.length) * 100} className="w-32 h-2" />
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={previousProblem} disabled={currentProblemIndex === 0}>
                上一题
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={nextProblem}
                disabled={currentProblemIndex === problems.length - 1}
              >
                下一题
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 题目内容 */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">{currentProblem.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className={getDifficultyColor(currentProblem.difficulty)}>
                  <Star className="h-3 w-3 mr-1" />
                  难度 {currentProblem.difficulty}/10
                </Badge>
                <Badge className={getCompetitionLevelColor(currentProblem.competitionLevel)}>
                  <Trophy className="h-3 w-3 mr-1" />
                  {currentProblem.competitionLevel}
                </Badge>
              </div>
            </div>
            <CardDescription>
              {currentProblem.competitionName} · {currentProblem.competitionYear}年 · {currentProblem.mathTopic}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* 题目内容 */}
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="prose prose-sm max-w-none">
                <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">{currentProblem.content}</div>
              </div>
            </div>

            {/* 答题区域 */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold">您的解答</h4>
                <div className="flex items-center gap-2">
                  {!isTimerRunning && timeSpent === 0 && (
                    <Button variant="outline" size="sm" onClick={startTimer}>
                      <Clock className="h-4 w-4 mr-2" />
                      开始计时
                    </Button>
                  )}
                  {isTimerRunning && (
                    <div className="flex items-center gap-2 text-blue-600">
                      <Clock className="h-4 w-4" />
                      <span className="font-mono">{formatTime(timeSpent)}</span>
                    </div>
                  )}
                </div>
              </div>

              <Textarea
                placeholder="请在此输入您的解答过程和最终答案..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                className="min-h-32"
                disabled={showSolution}
              />

              <div className="flex items-center gap-2">
                <Button
                  onClick={handleSubmitAnswer}
                  disabled={!userAnswer.trim() || showSolution}
                  className="flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  提交答案
                </Button>

                <Button
                  variant="outline"
                  onClick={handleRequestHint}
                  disabled={showSolution}
                  className="flex items-center gap-2"
                >
                  <Lightbulb className="h-4 w-4" />
                  获取提示
                </Button>

                {submittedAnswers[currentProblem.id] && (
                  <Badge variant="secondary" className="ml-auto">
                    已提交 · 用时 {formatTime(submittedAnswers[currentProblem.id].timeSpent)}
                  </Badge>
                )}
              </div>
            </div>

            {/* 提示信息 */}
            {showHint && (
              <Alert>
                <Lightbulb className="h-4 w-4" />
                <AlertDescription>
                  <div className="whitespace-pre-wrap">{currentHint}</div>
                </AlertDescription>
              </Alert>
            )}
          </CardContent>
        </Card>

        {/* 侧边栏信息 */}
        <div className="space-y-6">
          {/* 题目信息 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Target className="h-5 w-5" />
                题目信息
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">数学主题</span>
                <Badge variant="outline">{currentProblem.mathTopic}</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">建议用时</span>
                <span className="text-sm font-medium">{currentProblem.timeLimit}分钟</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">分值</span>
                <span className="text-sm font-medium">{currentProblem.points}分</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">竞赛来源</span>
                <span className="text-sm font-medium">{currentProblem.competitionName}</span>
              </div>
            </CardContent>
          </Card>

          {/* 解题方法 */}
          {showSolution && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  标准解答
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="solution" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="solution">解题步骤</TabsTrigger>
                    <TabsTrigger value="analysis">深度分析</TabsTrigger>
                  </TabsList>

                  <TabsContent value="solution" className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2">解题步骤</h5>
                      <ol className="list-decimal list-inside space-y-1 text-sm">
                        {currentProblem.solution.steps.map((step, index) => (
                          <li key={index} className="text-gray-700">
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">解题方法</h5>
                      <div className="flex flex-wrap gap-1">
                        {currentProblem.solution.methods.map((method, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {method}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="analysis" className="space-y-4">
                    <div>
                      <h5 className="font-semibold mb-2">关键洞察</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {currentProblem.solution.keyInsights.map((insight, index) => (
                          <li key={index} className="text-gray-700">
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h5 className="font-semibold mb-2">常见错误</h5>
                      <ul className="list-disc list-inside space-y-1 text-sm">
                        {currentProblem.solution.commonMistakes.map((mistake, index) => (
                          <li key={index} className="text-red-600">
                            {mistake}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* 学习统计 */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Award className="h-5 w-5" />
                学习统计
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-center p-3 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{Object.keys(submittedAnswers).length}</div>
                  <div className="text-xs text-gray-600">已完成</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {problems.length - Object.keys(submittedAnswers).length}
                  </div>
                  <div className="text-xs text-gray-600">待完成</div>
                </div>
              </div>

              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <div className="text-xl font-bold text-purple-600">
                  {Math.round((Object.keys(submittedAnswers).length / problems.length) * 100)}%
                </div>
                <div className="text-xs text-gray-600">完成进度</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
