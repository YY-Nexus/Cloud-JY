"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Info, Eye, EyeOff, Shield, BookOpen, GraduationCap, Users } from "lucide-react"

export function VerificationHint() {
  const [showHints, setShowHints] = useState(false)

  const hints = [
    { role: "系统管理员", code: "0379", icon: Shield, color: "bg-red-100 text-red-800" },
    { role: "演示学生", code: "2015", icon: BookOpen, color: "bg-blue-100 text-blue-800" },
    { role: "演示教师", code: "2025", icon: GraduationCap, color: "bg-green-100 text-green-800" },
    { role: "演示家长", code: "2025", icon: Users, color: "bg-purple-100 text-purple-800" },
  ]

  return (
    <Card className="bg-amber-50/80 border-amber-200/50">
      <CardContent className="pt-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600" />
            <span className="text-sm font-medium text-amber-800">验证码提示</span>
          </div>
          <Button
            onClick={() => setShowHints(!showHints)}
            variant="ghost"
            size="sm"
            className="h-6 text-amber-700 hover:text-amber-800"
          >
            {showHints ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          </Button>
        </div>

        {showHints ? (
          <div className="space-y-2">
            {hints.map((hint, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <Badge className={`${hint.color} flex items-center gap-1`}>
                  <hint.icon className="w-3 h-3" />
                  {hint.role}
                </Badge>
                <code className="bg-white/80 px-2 py-1 rounded text-amber-800 font-mono">{hint.code}</code>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-amber-700">点击眼睛图标查看各角色验证码</p>
        )}
      </CardContent>
    </Card>
  )
}
