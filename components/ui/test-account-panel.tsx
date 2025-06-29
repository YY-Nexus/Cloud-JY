"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Copy, Check, User, Shield, BookOpen, GraduationCap, Users } from "lucide-react"
import { TEST_ACCOUNTS } from "@/lib/test-accounts"
import { Input } from "@/components/ui/input"

interface TestAccountPanelProps {
  onAccountSelect?: (email: string, password: string) => void
  className?: string
}

export function TestAccountPanel({ onAccountSelect, className }: TestAccountPanelProps) {
  const [copiedAccount, setCopiedAccount] = useState<string | null>(null)

  const [verificationCode, setVerificationCode] = useState("")
  const [isVerified, setIsVerified] = useState(false)
  const [showVerification, setShowVerification] = useState(false)
  const [verificationError, setVerificationError] = useState("")

  const VERIFICATION_CODES = {
    admin: "0379",
    student: "2015",
    teacher: "2025",
    parent: "2025",
  } as const

  const copyToClipboard = async (text: string, accountType: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setCopiedAccount(accountType)
      setTimeout(() => setCopiedAccount(null), 2000)
    } catch (err) {
      console.error("复制失败:", err)
    }
  }

  const getAccountIcon = (role: string) => {
    switch (role) {
      case "admin":
        return <Shield className="w-4 h-4" />
      case "student":
        return <BookOpen className="w-4 h-4" />
      case "teacher":
        return <GraduationCap className="w-4 h-4" />
      case "parent":
        return <Users className="w-4 h-4" />
      default:
        return <User className="w-4 h-4" />
    }
  }

  const getAccountColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800 border-red-200"
      case "student":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "teacher":
        return "bg-green-100 text-green-800 border-green-200"
      case "parent":
        return "bg-purple-100 text-purple-800 border-purple-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getRoleName = (role: string) => {
    switch (role) {
      case "admin":
        return "系统管理员"
      case "student":
        return "学生"
      case "teacher":
        return "教师"
      case "parent":
        return "家长"
      default:
        return "用户"
    }
  }

  const handleVerification = () => {
    const validCodes = Object.values(VERIFICATION_CODES)
    if (validCodes.includes(verificationCode)) {
      setIsVerified(true)
      setVerificationError("")
      setShowVerification(false)
    } else {
      setVerificationError("验证码错误，请重新输入")
      setVerificationCode("")
    }
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="w-5 h-5 text-blue-600" />
          测试账号
        </CardTitle>
        <CardDescription>点击账号快速填入，或复制账号信息手动输入</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {!isVerified ? (
          // 显示验证码输入界面
          <div className="text-center space-y-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="font-medium text-gray-800">测试账号验证</h3>
              <p className="text-sm text-gray-600 mt-1">请输入验证码查看测试账号</p>
            </div>

            {!showVerification ? (
              <Button onClick={() => setShowVerification(true)} className="bg-blue-600 hover:bg-blue-700 text-white">
                显示验证码输入
              </Button>
            ) : (
              <div className="space-y-3">
                <Input
                  type="password"
                  placeholder="请输入验证码"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="text-center"
                  maxLength={4}
                />
                {verificationError && <p className="text-sm text-red-600">{verificationError}</p>}
                <div className="flex gap-2">
                  <Button
                    onClick={handleVerification}
                    disabled={!verificationCode}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                  >
                    验证
                  </Button>
                  <Button
                    onClick={() => {
                      setShowVerification(false)
                      setVerificationCode("")
                      setVerificationError("")
                    }}
                    variant="outline"
                    className="flex-1"
                  >
                    取消
                  </Button>
                </div>
              </div>
            )}
          </div>
        ) : (
          // 原有的测试账号列表内容
          <>
            {Object.entries(TEST_ACCOUNTS).map(([type, account]) => (
              <div
                key={type}
                className="flex items-center justify-between p-3 bg-gray-50/80 rounded-lg border hover:bg-gray-100/80 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Badge className={`${getAccountColor(account.profile.role)} flex items-center gap-1`}>
                    {getAccountIcon(account.profile.role)}
                    {getRoleName(account.profile.role)}
                  </Badge>
                  <div className="text-sm">
                    <div className="font-medium text-gray-800">{account.profile.real_name}</div>
                    <div className="text-gray-600">{account.email}</div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(`${account.email}\n${account.password}`, type)}
                    className="h-8 w-8 p-0"
                  >
                    {copiedAccount === type ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>

                  {onAccountSelect && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onAccountSelect(account.email, account.password)}
                      className="text-xs"
                    >
                      使用
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="mt-4 flex justify-between items-center">
              <Button
                onClick={() => {
                  setIsVerified(false)
                  setVerificationCode("")
                  setShowVerification(false)
                }}
                variant="ghost"
                size="sm"
                className="text-gray-500 hover:text-gray-700"
              >
                隐藏账号信息
              </Button>
            </div>
          </>
        )}

        <div className="mt-4 p-3 bg-amber-50/80 border border-amber-200/50 rounded-lg">
          <div className="flex items-start gap-2">
            <Shield className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-amber-700">
              <p className="font-medium">特别说明</p>
              <p className="mt-1">
                <strong>admin@yy.email</strong> 为系统管理员账号，拥有最高权限
              </p>
              <p>其他账号为演示账号，用于体验不同角色功能</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
