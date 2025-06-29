"use client"
import { getBrandLogo, getBrandName } from "@/lib/brand-config"
import { cn } from "@/lib/utils"

interface BrandLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  textPosition?: "right" | "bottom"
  className?: string
  imageClassName?: string
  textClassName?: string
  variant?: "full" | "icon" | "text"
}

const sizeConfig = {
  sm: { width: 24, height: 24, textSize: "text-sm" },
  md: { width: 32, height: 32, textSize: "text-base" },
  lg: { width: 40, height: 40, textSize: "text-lg" },
  xl: { width: 48, height: 48, textSize: "text-xl" },
}

export function BrandLogo({
  size = "md",
  showText = true,
  textPosition = "right",
  className,
  imageClassName,
  textClassName,
  variant = "full",
}: BrandLogoProps) {
  const logo = getBrandLogo()
  const brandName = getBrandName("chinese")
  const { width, height, textSize } = sizeConfig[size]

  if (variant === "text") {
    return (
      <div className={cn("flex items-center", className)}>
        <span
          className={cn(
            "font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent",
            textSize,
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
      <div className={cn("flex items-center", className)}>
        <div
          className={cn(
            "w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center",
            imageClassName,
          )}
        >
          <span className="text-white font-bold text-lg">言</span>
        </div>
      </div>
    )
  }

  return (
    <div className={cn("flex items-center gap-3", textPosition === "bottom" && "flex-col gap-1", className)}>
      <div
        className={cn(
          "w-8 h-8 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-lg flex items-center justify-center",
          imageClassName,
        )}
      >
        <span className="text-white font-bold text-lg">言</span>
      </div>
      {showText && (
        <div className={cn("flex flex-col", textPosition === "bottom" && "text-center")}>
          <span
            className={cn(
              "font-bold bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent",
              textSize,
              textClassName,
            )}
          >
            {brandName}
          </span>
          <span className="text-xs text-gray-500 font-medium">YYC³-DeepStack</span>
        </div>
      )}
    </div>
  )
}
