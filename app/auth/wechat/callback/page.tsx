"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"
import { BrandLogo } from "@/components/brand/brand-logo"

export default function WeChatCallbackPage() {
  const [error, setError] = useState("微信登录功能暂时不可用")
  const router = useRouter()

  useEffect(() => {
    // 暂时禁用微信登录功能
    setTimeout(() => {
      router.push("/login")
    }, 3000)
  }, [router])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BrandLogo size="lg" variant="icon" />
          </div>
          <CardTitle>言语云³ 微信登录</CardTitle>
          <CardDescription>微信登录功能正在开发中...</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>

          <Button onClick={() => router.push("/login")} className="w-full">
            返回登录页面
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
