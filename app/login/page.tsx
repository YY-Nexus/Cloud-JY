"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { useIsMobile } from "@/hooks/use-mobile"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import {
  Mail,
  Lock,
  Loader2,
  AlertCircle,
  CheckCircle,
  BookOpen,
  GraduationCap,
  Brain,
  Sparkles,
  Star,
  Globe,
  Zap,
  Crown,
  ArrowRight,
  Eye,
  EyeOff,
} from "lucide-react"
import Link from "next/link"
import { AnimatedBrandLogo } from "@/components/brand/animated-brand-logo"
import { BrandSlogan } from "@/components/brand/brand-slogan"
import { TestAccountPanel } from "@/components/ui/test-account-panel"
import { VerificationHint } from "@/components/ui/verification-hint"

export default function ModernLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [activeTab, setActiveTab] = useState("login")
  const [isAnimated, setIsAnimated] = useState(false)

  const { signIn } = useAuth()
  const router = useRouter()
  const isMobile = useIsMobile()

  useEffect(() => {
    // 启动入场动画
    const timer = setTimeout(() => setIsAnimated(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    // 模拟登录延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const { error } = await signIn(email, password)

    if (error) {
      setError("登录失败，请检查邮箱和密码")
    } else {
      // 检查是否为管理员账号
      if (email === "admin@yy.email") {
        setSuccess("管理员登录成功！正在跳转...")
      } else {
        setSuccess("登录成功！正在跳转...")
      }
      setTimeout(() => {
        router.push("/dashboard")
      }, 1000)
    }

    setLoading(false)
  }

  const handleQuickLogin = async (userType: string) => {
    setLoading(true)
    setError("")

    // 快速登录演示账号
    const demoAccounts = {
      student: { email: "student@demo.com", password: "demo123" },
      teacher: { email: "teacher@demo.com", password: "demo123" },
      parent: { email: "parent@demo.com", password: "demo123" },
    }

    const account = demoAccounts[userType as keyof typeof demoAccounts]

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const { error } = await signIn(account.email, account.password)

    if (!error) {
      setSuccess(`${userType === "student" ? "学生" : userType === "teacher" ? "教师" : "家长"}登录成功！`)
      setTimeout(() => router.push("/dashboard"), 1000)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
      {/* 背景装饰元素 */}
      <div className="absolute inset-0 overflow-hidden">
        {/* 浮动几何图形 */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/30 rounded-full blur-xl animate-pulse" />
        <div
          className="absolute top-40 right-20 w-24 h-24 bg-purple-200/30 rounded-full blur-lg animate-bounce"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-32 left-1/4 w-40 h-40 bg-cyan-200/20 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-20 right-10 w-28 h-28 bg-indigo-200/30 rounded-full blur-xl animate-bounce"
          style={{ animationDelay: "3s" }}
        />

        {/* 教育主题图标 */}
        <div className="absolute top-1/4 left-1/3 opacity-5 animate-float">
          <BookOpen className="w-16 h-16 text-blue-600" />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-5 animate-float" style={{ animationDelay: "1s" }}>
          <GraduationCap className="w-20 h-20 text-purple-600" />
        </div>
        <div className="absolute bottom-1/3 left-1/5 opacity-5 animate-float" style={{ animationDelay: "2s" }}>
          <Brain className="w-14 h-14 text-cyan-600" />
        </div>

        {/* 网格背景 */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div
          className={`w-full max-w-6xl transition-all duration-1000 ${isAnimated ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* 顶部品牌区域 */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <AnimatedBrandLogo
                  size="2xl"
                  textPosition="bottom"
                  animation="glow"
                  className="transform hover:scale-105 transition-all duration-500"
                />
                {/* 光环效果 */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-2xl animate-pulse" />
              </div>
            </div>

            <div className="space-y-4">
              <BrandSlogan showBoth size="xl" multiLine={true} animated={true} />

              {/* 特色标签 */}
              <div className="flex justify-center gap-3 flex-wrap mt-6">
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors px-3 py-1">
                  <Globe className="w-3 h-3 mr-1" />
                  多语言教学
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200 transition-colors px-3 py-1">
                  <Brain className="w-3 h-3 mr-1" />
                  AI智能辅导
                </Badge>
                <Badge className="bg-cyan-100 text-cyan-700 hover:bg-cyan-200 transition-colors px-3 py-1">
                  <Star className="w-3 h-3 mr-1" />
                  985/211冲刺
                </Badge>
                <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-200 transition-colors px-3 py-1">
                  <Crown className="w-3 h-3 mr-1" />
                  文化传承
                </Badge>
              </div>
            </div>
          </div>

          {/* 主要登录区域 */}
          <div className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-3"} gap-8 items-start`}>
            {/* 左侧：快速登录选项 */}
            {!isMobile && (
              <div className="space-y-6">
                <Card className="bg-white/80 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                  <CardHeader className="text-center pb-4">
                    <CardTitle className="text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                      快速体验
                    </CardTitle>
                    <CardDescription className="text-sm">选择身份快速登录演示</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      onClick={() => handleQuickLogin("student")}
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <BookOpen className="w-4 h-4 mr-2" />
                      学生登录
                    </Button>
                    <Button
                      onClick={() => handleQuickLogin("teacher")}
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      教师登录
                    </Button>
                    <Button
                      onClick={() => handleQuickLogin("parent")}
                      disabled={loading}
                      className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      家长登录
                    </Button>
                  </CardContent>
                </Card>

                <TestAccountPanel
                  onAccountSelect={(email, password) => {
                    setEmail(email)
                    setPassword(password)
                  }}
                />

                <VerificationHint />

                {/* 平台特色 */}
                <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200/50 shadow-xl">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center">
                          <Zap className="w-4 h-4 text-amber-600" />
                        </div>
                        <span className="text-sm font-medium text-amber-800">AI个性化学习路径</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <Globe className="w-4 h-4 text-blue-600" />
                        </div>
                        <span className="text-sm font-medium text-blue-800">6种语言同步教学</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                          <Star className="w-4 h-4 text-purple-600" />
                        </div>
                        <span className="text-sm font-medium text-purple-800">国际竞赛级训练</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* 中间：主登录表单 */}
            <div className={`${isMobile ? "col-span-1" : "lg:col-span-2"}`}>
              <Card className="bg-white/90 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden">
                {/* 卡片顶部装饰 */}
                <div className="h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500" />

                <CardHeader className="text-center pb-6">
                  <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    欢迎回到言语云³
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-lg">开启您的智慧学习之旅</CardDescription>
                </CardHeader>

                <CardContent className="px-8 pb-8">
                  <Tabs value={activeTab} onValueChange={setActiveTab}>
                    <TabsList className="grid w-full grid-cols-2 bg-gray-100/80 backdrop-blur-sm h-12">
                      <TabsTrigger
                        value="login"
                        className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium"
                      >
                        <Lock className="w-4 h-4 mr-2" />
                        账号登录
                      </TabsTrigger>
                      <TabsTrigger
                        value="email"
                        className="data-[state=active]:bg-white data-[state=active]:shadow-sm text-sm font-medium"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        邮箱验证
                      </TabsTrigger>
                    </TabsList>

                    {/* 账号登录 */}
                    <TabsContent value="login" className="space-y-6 mt-8">
                      <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            邮箱地址
                          </Label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="请输入您的邮箱地址"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="h-12 bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 text-base"
                            required
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="password"
                            className="text-sm font-medium text-gray-700 flex items-center gap-2"
                          >
                            <Lock className="w-4 h-4" />
                            密码
                          </Label>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              placeholder="请输入您的密码"
                              value={password}
                              onChange={(e) => setPassword(e.target.value)}
                              className="h-12 bg-white/70 border-gray-200 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-200 text-base pr-12"
                              required
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2 h-8 w-8 p-0 hover:bg-gray-100"
                              onClick={() => setShowPassword(!showPassword)}
                            >
                              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </Button>
                          </div>
                        </div>

                        {/* 演示提示 */}
                        <div className="bg-blue-50/80 border border-blue-200/50 rounded-lg p-4">
                          <div className="flex items-start gap-3">
                            <Sparkles className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                            <div>
                              <p className="text-sm font-medium text-blue-800">演示模式</p>
                              <p className="text-xs text-blue-600 mt-1">测试账号：admin@yy.email / admin123</p>
                              <p className="text-xs text-blue-600">或使用任意邮箱和密码登录体验平台功能</p>
                            </div>
                          </div>
                        </div>

                        {error && (
                          <Alert variant="destructive" className="bg-red-50/80 border-red-200">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>{error}</AlertDescription>
                          </Alert>
                        )}

                        {success && (
                          <Alert className="bg-green-50/80 border-green-200">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <AlertDescription className="text-green-800">{success}</AlertDescription>
                          </Alert>
                        )}

                        <Button
                          type="submit"
                          disabled={loading}
                          className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium shadow-lg hover:shadow-xl transition-all duration-300 text-base"
                        >
                          {loading ? (
                            <>
                              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                              登录中...
                            </>
                          ) : (
                            <>
                              立即登录
                              <ArrowRight className="ml-2 h-5 w-5" />
                            </>
                          )}
                        </Button>
                      </form>
                    </TabsContent>

                    {/* 邮箱验证登录 */}
                    <TabsContent value="email" className="space-y-6 mt-8">
                      <div className="text-center space-y-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-cyan-100 to-blue-100 rounded-full flex items-center justify-center mx-auto">
                          <Mail className="w-8 h-8 text-blue-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-800">邮箱验证登录</h3>
                          <p className="text-sm text-gray-600 mt-2">输入邮箱地址，我们将发送验证链接到您的邮箱</p>
                        </div>

                        <div className="space-y-4">
                          <Input
                            type="email"
                            placeholder="请输入您的邮箱地址"
                            className="h-12 bg-white/70 border-gray-200 focus:border-blue-400 text-base"
                          />
                          <Button className="w-full h-12 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white">
                            <Mail className="mr-2 h-4 w-4" />
                            发送验证邮件
                          </Button>
                        </div>

                        <div className="bg-cyan-50/80 border border-cyan-200/50 rounded-lg p-4">
                          <p className="text-xs text-cyan-700">邮箱验证登录更安全便捷，无需记住密码</p>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>

                  {/* 注册链接 */}
                  <div className="mt-8 pt-6 border-t border-gray-200/50 text-center">
                    <p className="text-gray-600">
                      还没有账号？{" "}
                      <Link
                        href="/register"
                        className="text-blue-600 hover:text-blue-700 font-medium hover:underline transition-colors duration-200 inline-flex items-center gap-1"
                      >
                        立即注册
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* 底部装饰 */}
          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-white/40 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
              <Sparkles className="w-4 h-4 text-blue-500" />
              <BrandSlogan language="chinese" size="sm" className="text-gray-700" />
              <Sparkles className="w-4 h-4 text-purple-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
