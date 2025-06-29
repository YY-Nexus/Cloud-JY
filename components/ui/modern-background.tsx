"use client"

import { cn } from "@/lib/utils"
import { FloatingElements } from "./floating-elements"

interface ModernBackgroundProps {
  className?: string
  variant?: "education" | "tech" | "gradient"
  animated?: boolean
  overlay?: boolean
}

export function ModernBackground({
  className,
  variant = "education",
  animated = true,
  overlay = true,
}: ModernBackgroundProps) {
  const getBackgroundClass = () => {
    switch (variant) {
      case "education":
        return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
      case "tech":
        return "bg-gradient-to-br from-slate-50 via-blue-50 to-cyan-50"
      case "gradient":
        return "bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600"
      default:
        return "bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"
    }
  }

  return (
    <div className={cn("relative min-h-screen", getBackgroundClass(), className)}>
      {/* 几何图案背景 */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-32 h-32 bg-blue-400 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute top-1/3 right-20 w-24 h-24 bg-purple-400 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />
        <div
          className="absolute bottom-1/4 left-1/4 w-40 h-40 bg-cyan-400 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "2s" }}
        />
        <div
          className="absolute bottom-10 right-10 w-28 h-28 bg-indigo-400 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "3s" }}
        />
      </div>

      {/* 网格图案 */}
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

      {/* 浮动元素 */}
      {animated && <FloatingElements />}

      {/* 渐变遮罩 */}
      {overlay && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10" />}

      {/* 3D 立体效果 */}
      <div className="absolute inset-0">
        {/* 左上角光效 */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/20 rounded-full blur-3xl" />

        {/* 右下角光效 */}
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl" />

        {/* 中心光效 */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-100/10 rounded-full blur-3xl" />
      </div>
    </div>
  )
}
