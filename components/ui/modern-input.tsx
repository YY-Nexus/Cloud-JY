"use client"

import * as React from "react"
import { cn } from "@/lib/utils"

export interface ModernInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "floating" | "outlined"
  icon?: React.ReactNode
  error?: boolean
  success?: boolean
}

const ModernInput = React.forwardRef<HTMLInputElement, ModernInputProps>(
  ({ className, variant = "default", icon, error, success, type, ...props }, ref) => {
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)

    const handleFocus = () => setIsFocused(true)
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false)
      setHasValue(e.target.value.length > 0)
    }

    const getVariantClasses = () => {
      switch (variant) {
        case "floating":
          return cn(
            "peer w-full bg-transparent border-0 border-b-2 border-gray-300 px-0 py-3 text-base",
            "focus:border-blue-500 focus:outline-none focus:ring-0",
            "placeholder-transparent",
            error && "border-red-500 focus:border-red-500",
            success && "border-green-500 focus:border-green-500",
          )
        case "outlined":
          return cn(
            "w-full rounded-lg border-2 border-gray-200 bg-white/50 px-4 py-3 text-base",
            "transition-all duration-200 ease-in-out",
            "focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20",
            "hover:border-gray-300",
            error && "border-red-500 focus:border-red-500 focus:ring-red-500/20",
            success && "border-green-500 focus:border-green-500 focus:ring-green-500/20",
          )
        default:
          return cn(
            "flex h-12 w-full rounded-lg border border-gray-200 bg-white/70 px-4 py-2 text-base",
            "transition-all duration-200 ease-in-out",
            "file:border-0 file:bg-transparent file:text-sm file:font-medium",
            "placeholder:text-gray-500",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/20 focus-visible:border-blue-500",
            "disabled:cursor-not-allowed disabled:opacity-50",
            "hover:border-gray-300",
            error && "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20",
            success && "border-green-500 focus-visible:border-green-500 focus-visible:ring-green-500/20",
          )
      }
    }

    if (variant === "floating") {
      return (
        <div className="relative">
          <input
            type={type}
            className={cn(getVariantClasses(), className)}
            ref={ref}
            onFocus={handleFocus}
            onBlur={handleBlur}
            {...props}
          />
          <label
            className={cn(
              "absolute left-0 top-3 text-gray-500 transition-all duration-200 ease-in-out",
              "peer-placeholder-shown:top-3 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500",
              "peer-focus:-top-2 peer-focus:text-sm peer-focus:text-blue-500",
              (isFocused || hasValue) && "-top-2 text-sm text-blue-500",
              error && "text-red-500 peer-focus:text-red-500",
              success && "text-green-500 peer-focus:text-green-500",
            )}
          >
            {props.placeholder}
          </label>
        </div>
      )
    }

    if (icon) {
      return (
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">{icon}</div>
          <input type={type} className={cn(getVariantClasses(), "pl-10", className)} ref={ref} {...props} />
        </div>
      )
    }

    return <input type={type} className={cn(getVariantClasses(), className)} ref={ref} {...props} />
  },
)

ModernInput.displayName = "ModernInput"

export { ModernInput }
