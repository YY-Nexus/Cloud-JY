"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { Card } from "@/components/ui/card"

interface ModernCardProps {
  className?: string
  children: React.ReactNode
  glowEffect?: boolean
  animated?: boolean
  variant?: "default" | "glass" | "elevated" | "neon"
}

export function ModernCard({
  className,
  children,
  glowEffect = false,
  animated = true,
  variant = "glass",
}: ModernCardProps) {
  const getVariantClass = () => {
    switch (variant) {
      case "glass":
        return "bg-white/80 backdrop-blur-xl border-white/20 shadow-2xl"
      case "elevated":
        return "bg-white shadow-2xl border-0"
      case "neon":
        return "bg-white/90 border-2 border-blue-200/50 shadow-2xl shadow-blue-500/10"
      default:
        return "bg-white/70 backdrop-blur-lg border-white/30 shadow-xl"
    }
  }

  return (
    <div className="relative">
      {/* 发光效果 */}
      {glowEffect && (
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 rounded-lg blur opacity-25 animate-pulse" />
      )}

      <Card
        className={cn(
          "relative border-0 transition-all duration-500",
          getVariantClass(),
          animated && "hover:scale-[1.02] hover:shadow-3xl",
          glowEffect && "hover:shadow-blue-500/25",
          className,
        )}
      >
        {children}
      </Card>
    </div>
  )
}

// 导出带预设的卡片组件
export function GlassCard({ children, className, ...props }: Omit<ModernCardProps, "variant">) {
  return (
    <ModernCard variant="glass" className={className} {...props}>
      {children}
    </ModernCard>
  )
}

export function ElevatedCard({ children, className, ...props }: Omit<ModernCardProps, "variant">) {
  return (
    <ModernCard variant="elevated" className={className} {...props}>
      {children}
    </ModernCard>
  )
}

export function NeonCard({ children, className, ...props }: Omit<ModernCardProps, "variant">) {
  return (
    <ModernCard variant="neon" className={className} {...props}>
      {children}
    </ModernCard>
  )
}
