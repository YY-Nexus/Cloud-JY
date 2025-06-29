"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { getBrandLogo, getBrandName } from "@/lib/brand-config"
import { cn } from "@/lib/utils"

interface AnimatedBrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl" | "2xl"
  showText?: boolean
  textPosition?: "right" | "bottom"
  className?: string
  imageClassName?: string
  textClassName?: string
  variant?: "full" | "icon" | "text"
  animation?: "float" | "pulse" | "rotate" | "glow" | "bounce" | "none"
  autoPlay?: boolean
}

const sizeConfig = {
  sm: { width: 24, height: 24, textSize: "text-sm" },
  md: { width: 32, height: 32, textSize: "text-base" },
  lg: { width: 40, height: 40, textSize: "text-lg" },
  xl: { width: 48, height: 48, textSize: "text-xl" },
  "2xl": { width: 64, height: 64, textSize: "text-2xl" },
}

export function AnimatedBrandLogo({
  size = "xl",
  showText = true,
  textPosition = "bottom",
  className,
  imageClassName,
  textClassName,
  variant = "full",
  animation = "float",
  autoPlay = true,
}: AnimatedBrandLogoProps) {
  const [isAnimating, setIsAnimating] = useState(autoPlay)
  const [glowEffect, setGlowEffect] = useState(false)

  const logo = getBrandLogo()
  const brandName = getBrandName("chinese")
  const { width, height, textSize } = sizeConfig[size]

  useEffect(() => {
    if (animation === "glow") {
      const interval = setInterval(() => {
        setGlowEffect((prev) => !prev)
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [animation])

  const getAnimationClass = () => {
    if (!isAnimating) return ""

    switch (animation) {
      case "float":
        return "animate-bounce"
      case "pulse":
        return "animate-pulse"
      case "rotate":
        return "animate-spin"
      case "glow":
        return glowEffect
          ? "drop-shadow-lg scale-105 transition-all duration-1000"
          : "drop-shadow-md transition-all duration-1000"
      case "bounce":
        return "animate-bounce"
      default:
        return ""
    }
  }

  if (variant === "text") {
    return (
      <div className={cn("flex items-center", className)}>
        <span
          className={cn(
            "font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent",
            textSize,
            isAnimating && "animate-pulse",
            textClassName,
          )}
        >
          {brandName}
        </span>
      </div>
    )
  }

  if (variant === "icon") {
    return (
      <div className={cn("flex items-center cursor-pointer", className)} onClick={() => setIsAnimating(!isAnimating)}>
        <div className="relative">
          <Image
            src={logo.main || "/placeholder.svg?height=64&width=64&text=Logo"}
            alt={brandName}
            width={width}
            height={height}
            className={cn("object-contain transition-all duration-300", getAnimationClass(), imageClassName)}
            priority
          />
          {animation === "glow" && (
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-30 -z-10" />
          )}
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center gap-3 cursor-pointer group",
        textPosition === "bottom" && "flex-col gap-2",
        className,
      )}
      onClick={() => setIsAnimating(!isAnimating)}
    >
      <div className="relative">
        <Image
          src={logo.main || "/placeholder.svg?height=64&width=64&text=Logo"}
          alt={brandName}
          width={width}
          height={height}
          className={cn(
            "object-contain transition-all duration-300 group-hover:scale-110",
            getAnimationClass(),
            imageClassName,
          )}
          priority
        />
        {animation === "glow" && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-full blur-xl opacity-30 -z-10" />
        )}

        {/* 3D 效果环圈 */}
        <div className="absolute inset-0 rounded-full border-2 border-blue-200/30 animate-ping" />
        <div className="absolute inset-0 rounded-full border border-cyan-300/50 animate-pulse" />
      </div>

      {showText && (
        <div className={cn("flex flex-col", textPosition === "bottom" && "text-center")}>
          <span
            className={cn(
              "font-bold bg-gradient-to-r from-blue-600 via-cyan-500 to-purple-600 bg-clip-text text-transparent transition-all duration-300",
              textSize,
              isAnimating && "animate-pulse",
              textClassName,
            )}
          >
            {brandName}
          </span>
          <span className="text-xs text-gray-500 font-medium tracking-wider">YYC³-DeepStack</span>
        </div>
      )}
    </div>
  )
}
