"use client"

import { getBrandSlogan } from "@/lib/brand-config"
import { cn } from "@/lib/utils"

interface BrandSloganProps {
  language?: "chinese" | "english"
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
  showBoth?: boolean
  multiLine?: boolean
  animated?: boolean
}

const sizeConfig = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
  xl: "text-xl",
}

export function BrandSlogan({
  language = "chinese",
  size = "md",
  className,
  showBoth = false,
  multiLine = false,
  animated = false,
}: BrandSloganProps) {
  const chineseSlogan = getBrandSlogan("chinese")
  const englishSlogan = getBrandSlogan("english")
  const textSize = sizeConfig[size]

  // 将英文标语分为两行
  const englishLines = multiLine
    ? ["All things converge to the Cloud Pivot;", "YanYu's wisdom ignites a new epoch."]
    : [englishSlogan]

  if (showBoth) {
    return (
      <div className={cn("text-center space-y-2", className)}>
        <p
          className={cn(
            "font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent",
            textSize,
            animated && "animate-pulse",
          )}
        >
          {chineseSlogan}
        </p>
        <div
          className={cn(
            "text-gray-600 italic leading-relaxed",
            size === "xl" ? "text-lg" : size === "lg" ? "text-base" : size === "md" ? "text-sm" : "text-xs",
            animated && "animate-fade-in",
          )}
        >
          {multiLine ? (
            englishLines.map((line, index) => (
              <p key={index} className={index > 0 ? "mt-1" : ""}>
                {line}
              </p>
            ))
          ) : (
            <p>{englishSlogan}</p>
          )}
        </div>
      </div>
    )
  }

  if (language === "english" && multiLine) {
    return (
      <div className={cn("text-center space-y-1", className)}>
        {englishLines.map((line, index) => (
          <p
            key={index}
            className={cn(
              "font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent italic",
              textSize,
              animated && "animate-pulse",
            )}
          >
            {line}
          </p>
        ))}
      </div>
    )
  }

  return (
    <p
      className={cn(
        "font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent",
        textSize,
        language === "english" && "italic",
        animated && "animate-pulse",
        className,
      )}
    >
      {language === "chinese" ? chineseSlogan : englishSlogan}
    </p>
  )
}
