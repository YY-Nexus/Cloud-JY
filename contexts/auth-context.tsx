"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { User } from "@supabase/supabase-js"
import { supabase, type UserProfile } from "@/lib/supabase"

interface AuthContextType {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: any }>
  signUp: (email: string, password: string, userData: any) => Promise<{ error: any }>
  signOut: () => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<{ error: any }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)

  // 检查是否为演示模式
  const isDemoMode =
    !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://demo.supabase.co"

  useEffect(() => {
    if (isDemoMode) {
      // 演示模式：直接设置为未登录状态
      setLoading(false)
      return
    }

    // 真实模式：获取初始会话
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        fetchUserProfile(session.user.id)
      } else {
        setLoading(false)
      }
    })

    // 监听认证状态变化
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null)
      if (session?.user) {
        await fetchUserProfile(session.user.id)
      } else {
        setProfile(null)
        setLoading(false)
      }
    })

    return () => subscription.unsubscribe()
  }, [isDemoMode])

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("user_profiles").select("*").eq("user_id", userId).single()

      if (error) {
        console.error("获取用户档案失败:", error)
      } else {
        setProfile(data)
      }
    } catch (error) {
      console.error("获取用户档案异常:", error)
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string) => {
    if (isDemoMode) {
      // 演示模式登录
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // 检查是否为测试账号
      if (email === "admin@yy.email" && password === "admin123") {
        const adminUser = {
          id: "admin-user-id",
          email: email,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        } as User

        const adminProfile: UserProfile = {
          id: "admin-profile-id",
          user_id: "admin-user-id",
          role: "admin",
          status: "active",
          real_name: "系统管理员",
          phone: "138****0000",
          avatar_url: "/placeholder.svg?height=100&width=100",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        }

        setUser(adminUser)
        setProfile(adminProfile)
        setLoading(false)
        return { error: null }
      }

      // 其他演示账号逻辑保持不变
      const demoUser = {
        id: "demo-user-id",
        email: email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as User

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

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { error }
  }

  const signUp = async (email: string, password: string, userData: any) => {
    if (isDemoMode) {
      // 演示模式注册
      setLoading(true)
      await new Promise((resolve) => setTimeout(resolve, 1500))

      const demoUser = {
        id: "demo-user-id",
        email: email,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      } as User

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

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (!error && data.user) {
      // 创建用户档案
      const { error: profileError } = await supabase.from("user_profiles").insert({
        user_id: data.user.id,
        role: userData.role,
        real_name: userData.real_name,
        phone: userData.phone,
      })

      if (profileError) {
        console.error("创建用户档案失败:", profileError)
        return { error: profileError }
      }

      // 根据角色创建详细信息
      if (userData.role === "student") {
        await supabase.from("students").insert({
          user_id: data.user.id,
          student_id: userData.student_id,
          grade: userData.grade,
          school_name: userData.school_name,
        })
      } else if (userData.role === "teacher") {
        await supabase.from("teachers").insert({
          user_id: data.user.id,
          teacher_id: userData.teacher_id,
          subjects: userData.subjects,
          grades: userData.grades,
          school_name: userData.school_name,
        })
      } else if (userData.role === "parent") {
        await supabase.from("parents").insert({
          user_id: data.user.id,
          occupation: userData.occupation,
          relationship_to_student: userData.relationship_to_student,
        })
      }
    }

    return { error }
  }

  const signOut = async () => {
    if (isDemoMode) {
      setUser(null)
      setProfile(null)
      return
    }
    await supabase.auth.signOut()
  }

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return { error: new Error("未登录") }

    if (isDemoMode) {
      setProfile((prev) => (prev ? { ...prev, ...updates } : null))
      return { error: null }
    }

    const { error } = await supabase.from("user_profiles").update(updates).eq("user_id", user.id)

    if (!error) {
      setProfile((prev) => (prev ? { ...prev, ...updates } : null))
    }

    return { error }
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth必须在AuthProvider内使用")
  }
  return context
}
