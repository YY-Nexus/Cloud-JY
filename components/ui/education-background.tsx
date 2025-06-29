"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  GraduationCap,
  Calculator,
  Globe,
  Brain,
  Lightbulb,
  Star,
  Zap,
  Crown,
  Palette,
  Music,
  Feather,
} from "lucide-react"

interface EducationBackgroundProps {
  className?: string
  animated?: boolean
  variant?: "default" | "minimal" | "rich"
}

const educationIcons = [
  BookOpen,
  GraduationCap,
  Calculator,
  Globe,
  Brain,
  Lightbulb,
  Star,
  Zap,
  Crown,
  Palette,
  Music,
  Feather,
]

interface FloatingIcon {
  id: number
  Icon: any
  x: number
  y: number
  delay: number
  duration: number
  scale: number
  opacity: number
}

export function EducationBackground({ className, animated = true, variant = "default" }: EducationBackgroundProps) {
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([])

  useEffect(() => {
    if (!animated) return

    const iconCount = variant === "minimal" ? 6 : variant === "rich" ? 15 : 10

    const icons: FloatingIcon[] = Array.from({ length: iconCount }, (_, i) => ({
      id: i,
      Icon: educationIcons[i % educationIcons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 8 + Math.random() * 12,
      scale: 0.3 + Math.random() * 0.4,
      opacity: 0.03 + Math.random() * 0.05,
    }))

    setFloatingIcons(icons)
  }, [animated, variant])

  const getBackgroundElements = () => {
    switch (variant) {
      case "minimal":
        return (
          <>
            <div className="absolute top-20 left-10 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl animate-pulse" />
            <div
              className="absolute bottom-20 right-10 w-28 h-28 bg-purple-200/20 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
          </>
        )
      case "rich":
        return (
          <>
            <div className="absolute top-10 left-10 w-40 h-40 bg-blue-200/25 rounded-full blur-3xl animate-pulse" />
            <div
              className="absolute top-1/4 right-20 w-32 h-32 bg-purple-200/25 rounded-full blur-2xl animate-bounce"
              style={{ animationDelay: "1s" }}
            />
            <div
              className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-cyan-200/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: "2s" }}
            />
            <div
              className="absolute bottom-10 right-10 w-36 h-36 bg-indigo-200/25 rounded-full blur-2xl animate-bounce"
              style={{ animationDelay: "3s" }}
            />
            <div
              className="absolute top-1/2 left-10 w-24 h-24 bg-amber-200/30 rounded-full blur-xl animate-pulse"
              style={{ animationDelay: "4s" }}
            />
            <div
              className="absolute top-3/4 right-1/3 w-28 h-28 bg-rose-200/25 rounded-full blur-xl animate-bounce"
              style={{ animationDelay: "5s" }}
            />
          </>
        )
      default:
        return (
          <>
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
          </>
        )
    }
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {/* 背景几何图形 */}
      {getBackgroundElements()}

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

      {/* 浮动教育图标 */}
      {animated &&
        floatingIcons.map((item) => {
          const { Icon } = item
          return (
            <div
              key={item.id}
              className="absolute text-blue-600 animate-float"
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: `scale(${item.scale})`,
                opacity: item.opacity,
                animationDuration: `${item.duration}s`,
                animationDelay: `${item.delay}s`,
              }}
            >
              <Icon className="w-12 h-12" />
            </div>
          )
        })}

      {/* 渐变遮罩 */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-white/10" />

      {/* 光效 */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-cyan-100/5 rounded-full blur-3xl" />
    </div>
  )
}
