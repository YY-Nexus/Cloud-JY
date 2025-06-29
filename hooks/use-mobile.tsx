"use client"

import { useState, useEffect } from "react"

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // 初始检查
    checkDevice()

    // 监听窗口大小变化
    window.addEventListener("resize", checkDevice)

    return () => {
      window.removeEventListener("resize", checkDevice)
    }
  }, [])

  return isMobile
}

export function useDeviceType() {
  const [deviceType, setDeviceType] = useState<"mobile" | "tablet" | "desktop">("desktop")

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      if (width < 768) {
        setDeviceType("mobile")
      } else if (width < 1024) {
        setDeviceType("tablet")
      } else {
        setDeviceType("desktop")
      }
    }

    checkDevice()
    window.addEventListener("resize", checkDevice)

    return () => {
      window.removeEventListener("resize", checkDevice)
    }
  }, [])

  return deviceType
}
