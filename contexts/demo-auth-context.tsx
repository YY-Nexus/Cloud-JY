"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { UserProfile } from "@/lib/supabase"

interface DemoUser {
  id: string
  email: string
}

interface DemoAuthContextType {
  user: DemoUser | null
  profile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>
}

const DemoAuthContext = createContext<DemoAuthContextType | undefined>(undefined)

export function DemoAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(false)

  const signIn = async (email: string, password: string) => {
    setLoading(true)

    // 模拟登录延迟
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 创建演示用户
    const demoUser: DemoUser = {
      id: "demo-user-id",
      email: email,
    }

    const demoProfile: UserProfile = {
      id: "demo-profile-id",
      user_id: "demo-user-id",
      role: "student",
      status: "active",
      real_name: "演示学生",
      phone: "138****8888",
      avatar_url: "/placeholder.svg?height=100&width=100",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setUser(demoUser)
    setProfile(demoProfile)
    setLoading(false)

    return { error: null }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    setLoading(true)

    // 模拟注册延迟
    await new Promise((resolve) => setTimeout(resolve, 1500))

    const demoUser: DemoUser = {
      id: "demo-user-id",
      email: email,
    }

    const demoProfile: UserProfile = {
      id: "demo-profile-id",
      user_id: "demo-user-id",
      role: userData.role,
      status: "active",
      real_name: userData.real_name,
      phone: userData.phone,
      avatar_url: "/placeholder.svg?height=100&width=100",
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    setUser(demoUser)
    setProfile(demoProfile)
    setLoading(false)

    return { error: null }
  }

  const signOut = async () => {
    setUser(null)
    setProfile(null)
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return { error: new Error("未登录") }

    setProfile((prev) => (prev ? { ...prev, ...updates } : null))
    return { error: null }
  }

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
  }

  return <DemoAuthContext.Provider value={value}>{children}</DemoAuthContext.Provider>
}

export function useDemoAuth() {
  const context = useContext(DemoAuthContext)
  if (context === undefined) {
    throw new Error("useDemoAuth必须在DemoAuthProvider内使用")
  }
  return context
}
