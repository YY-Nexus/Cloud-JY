"use client"

import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { BookOpen, GraduationCap, Settings, LogOut, Bell, Calendar, TrendingUp, Zap, Globe, Crown } from "lucide-react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { BrandLogo } from "@/components/brand/brand-logo"
import { BrandSlogan } from "@/components/brand/brand-slogan"

export default function DashboardPage() {
  const { user, profile, signOut, loading } = useAuth()
  const router = useRouter()
  const [roleData, setRoleData] = useState<any>(null)

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login")
      return
    }

    if (profile && user) {
      fetchRoleSpecificData()
    }
  }, [user, profile, loading, router])

  const fetchRoleSpecificData = async () => {
    if (!profile || !user) return

    try {
      let data = null
      if (profile.role === "student") {
        const { data: studentData } = await supabase.from("students").select("*").eq("user_id", user.id).single()
        data = studentData
      } else if (profile.role === "teacher") {
        const { data: teacherData } = await supabase.from("teachers").select("*").eq("user_id", user.id).single()
        data = teacherData
      } else if (profile.role === "parent") {
        const { data: parentData } = await supabase.from("parents").select("*").eq("user_id", user.id).single()
        data = parentData
      }
      setRoleData(data)
    } catch (error) {
      console.error("获取角色数据失败:", error)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    router.push("/login")
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* 顶部导航栏 */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <BrandLogo size="md" />
              <div>
                <h1 className="text-xl font-bold text-gray-900">言语云³ 智能教育平台</h1>
                <p className="text-xs text-gray-500">YYC³-DeepStack · AI-Powered Education</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="h-4 w-4" />
                退出
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 欢迎区域 */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-700 rounded-lg p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-3xl font-bold mb-2">欢迎回来，{profile.real_name}！</h2>
                <BrandSlogan language="chinese" size="lg" className="text-blue-100 mb-4" />
                <p className="text-blue-100 text-lg mb-4">
                  {profile.role === "student" && "今天也要努力学习，向着985/211的目标前进！"}
                  {profile.role === "teacher" && "感谢您的辛勤付出，培育祖国的栋梁之才！"}
                  {profile.role === "parent" && "感谢您对孩子教育的关心和支持！"}
                </p>
                <div className="flex items-center gap-4">
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Globe className="h-3 w-3 mr-1" />
                    多语言教学
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Zap className="h-3 w-3 mr-1" />
                    AI智能辅导
                  </Badge>
                  <Badge className="bg-white/20 text-white border-white/30">
                    <Crown className="h-3 w-3 mr-1" />
                    文化传承
                  </Badge>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20 border-4 border-white/30">
                  <AvatarImage src={profile.avatar_url || "/placeholder.svg"} />
                  <AvatarFallback className="bg-white text-blue-600 text-2xl font-bold">
                    {profile.real_name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                {profile.role === "admin" && (
                  <Badge className="bg-red-100 text-red-800 border-red-300">
                    <Crown className="h-3 w-3 mr-1" />
                    系统管理员
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 快速开始学习 */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-yellow-600" />
              开始您的学习之旅
            </CardTitle>
            <CardDescription className="text-lg">选择学习模块，开启智慧教育体验</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Link href="/learning">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="bg-blue-600 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                        <BookOpen className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-blue-800">多语言教学</h3>
                        <p className="text-blue-600 text-sm mt-2">古文学、现代学、英语、日语、韩语、俄语同步化学习</p>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">开始学习</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/learning">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="bg-green-600 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                        <TrendingUp className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-green-800">奥数训练</h3>
                        <p className="text-green-600 text-sm mt-2">国际标准奥数路线，培养数学思维能力</p>
                      </div>
                      <Button className="w-full bg-green-600 hover:bg-green-700">开始训练</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="/learning">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="text-center space-y-4">
                      <div className="bg-purple-600 p-4 rounded-full w-16 h-16 mx-auto flex items-center justify-center">
                        <Crown className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-purple-800">文艺赋能</h3>
                        <p className="text-purple-600 text-sm mt-2">诗词、书法、文学鉴赏，提升文化素养</p>
                      </div>
                      <Button className="w-full bg-purple-600 hover:bg-purple-700">开始创作</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* 学习统计和目标 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 学习进度 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                学习进度
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">85%</div>
                  <div className="text-sm text-gray-600">总体进度</div>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">12</div>
                  <div className="text-sm text-gray-600">已完成课程</div>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>多语言学习</span>
                    <span>90%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full" style={{ width: "90%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>奥数训练</span>
                    <span>75%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-600 h-2 rounded-full" style={{ width: "75%" }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>文艺素养</span>
                    <span>88%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-purple-600 h-2 rounded-full" style={{ width: "88%" }}></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 目标设定 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                学习目标
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-4 rounded-lg border-l-4 border-amber-400">
                <h4 className="font-semibold text-amber-800 mb-2">终极目标</h4>
                <p className="text-amber-700">
                  {profile.role === "student" && "冲刺985/211顶尖学府，或申请美国名校"}
                  {profile.role === "teacher" && "培养更多学霸级学生，提升教学质量"}
                  {profile.role === "parent" && "助力孩子实现学业梦想，成就美好未来"}
                </p>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">多语言能力</span>
                  <Badge variant="secondary">优秀</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">数学竞赛水平</span>
                  <Badge variant="secondary">省级</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <span className="text-sm font-medium">文化素养</span>
                  <Badge variant="secondary">深厚</Badge>
                </div>
              </div>

              <Button className="w-full" variant="outline">
                <Calendar className="h-4 w-4 mr-2" />
                制定学习计划
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* 底部激励语 */}
        <Card className="mt-8 bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardContent className="pt-6">
            <div className="text-center space-y-3">
              <BrandSlogan showBoth size="lg" />
              <p className="text-amber-700 max-w-3xl mx-auto">
                凡事都应顺时势思时时去适时做实事！传承文化、携手智能，经历一段跨世纪的非同学习阶段，
                学生定当以非同985超越211鞭策励志，行于己，学于心，用于时光，礼记师恩。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
