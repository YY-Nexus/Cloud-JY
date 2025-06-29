"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/auth-context"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Info } from "lucide-react"
import { BrandLogo } from "@/components/brand/brand-logo"
import { BrandSlogan } from "@/components/brand/brand-slogan"

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  // 检查是否为演示模式
  const isDemoMode =
    !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://demo.supabase.co"

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push("/dashboard")
      } else {
        router.push("/login")
      }
    }
  }, [user, loading, router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full space-y-6">
        {/* 演示模式提示 */}
        {isDemoMode && (
          <Alert className="bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              当前运行在演示模式下。您可以使用任意邮箱和密码进行登录体验。
            </AlertDescription>
          </Alert>
        )}

        <Card className="shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <BrandLogo size="xl" variant="icon" />
            </div>
            <CardTitle className="text-2xl bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              言语云³ 智能教育平台
            </CardTitle>
            <CardDescription className="text-lg">YYC³-DeepStack Education Platform</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">正在加载...</p>
            </div>

            <div className="flex justify-center gap-2 flex-wrap">
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                多语言教学
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-800">
                AI智能辅导
              </Badge>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">
                奥数训练
              </Badge>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">
                文艺赋能
              </Badge>
            </div>

            <BrandSlogan showBoth size="md" multiLine={true} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
