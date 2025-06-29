"use client"

import { useEffect, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { emailVerification } from "@/lib/email-verification"
import { BrandLogo } from "@/components/brand/brand-logo"

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading")
  const [message, setMessage] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams()

  useEffect(() => {
    const handleEmailVerification = async () => {
      try {
        const token = searchParams.get("token")

        if (!token) {
          throw new Error("验证令牌无效")
        }

        const { error } = await emailVerification.verifyEmail(token)

        if (error) {
          throw new Error("邮箱验证失败")
        }

        setStatus("success")
        setMessage("邮箱验证成功！您现在可以登录了。")
      } catch (error) {
        setStatus("error")
        setMessage(error instanceof Error ? error.message : "邮箱验证失败")
      }
    }

    handleEmailVerification()
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <BrandLogo size="lg" variant="icon" />
          </div>
          <CardTitle>言语云³ 邮箱验证</CardTitle>
          <CardDescription>正在验证您的邮箱地址...</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          {status === "loading" && (
            <div>
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
              <p className="text-gray-600">正在验证邮箱...</p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription className="text-green-600">{message}</AlertDescription>
              </Alert>
              <Button onClick={() => router.push("/login")} className="w-full">
                前往登录
              </Button>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{message}</AlertDescription>
              </Alert>
              <Button onClick={() => router.push("/login")} variant="outline" className="w-full">
                返回登录
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
