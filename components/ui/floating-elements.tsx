"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { BookOpen, GraduationCap, Calculator, Globe, Brain, Lightbulb, Star, Zap } from "lucide-react"

interface FloatingElement {
  id: number
  icon: any
  x: number
  y: number
  delay: number
  duration: number
  scale: number
}

interface FloatingElementsProps {
  className?: string
  count?: number
  animated?: boolean
}

const icons = [BookOpen, GraduationCap, Calculator, Globe, Brain, Lightbulb, Star, Zap]

export function FloatingElements({ className, count = 8, animated = true }: FloatingElementsProps) {
  const [elements, setElements] = useState<FloatingElement[]>([])

  useEffect(() => {
    const newElements: FloatingElement[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      icon: icons[i % icons.length],
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10,
      scale: 0.5 + Math.random() * 0.5,
    }))
    setElements(newElements)
  }, [count])

  if (!animated) return null

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none", className)}>
      {elements.map((element) => {
        const Icon = element.icon
        return (
          <div
            key={element.id}
            className="absolute opacity-10 text-blue-400 animate-float"
            style={{
              left: `${element.x}%`,
              top: `${element.y}%`,
              transform: `scale(${element.scale})`,
              animationDuration: `${element.duration}s`,
              animationDelay: `${element.delay}s`,
            }}
          >
            <Icon className="w-8 h-8" />
          </div>
        )
      })}
    </div>
  )
}
