import { createClient } from "@supabase/supabase-js"

// 提供默认值以避免在开发环境中出错
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co"
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-anon-key"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
})

// 用户角色类型定义
export type UserRole = "student" | "teacher" | "parent" | "admin"
export type UserStatus = "active" | "inactive" | "suspended" | "pending"
export type GradeLevel = "grade_7" | "grade_8" | "grade_9" | "grade_10" | "grade_11" | "grade_12"

// 数据库类型定义
export interface UserProfile {
  id: string
  user_id: string
  role: UserRole
  status: UserStatus
  real_name: string
  phone?: string
  avatar_url?: string
  created_at: string
  updated_at: string
}

export interface Student {
  id: string
  user_id: string
  student_id: string
  grade: GradeLevel
  class_name?: string
  school_name?: string
  enrollment_date?: string
  learning_style: string
  target_university?: string
  strengths?: string[]
  weaknesses?: string[]
  created_at: string
  updated_at: string
}

export interface Teacher {
  id: string
  user_id: string
  teacher_id: string
  subjects: string[]
  grades: GradeLevel[]
  school_name?: string
  title?: string
  experience_years: number
  specialties?: string[]
  certification_level?: string
  created_at: string
  updated_at: string
}

export interface Parent {
  id: string
  user_id: string
  occupation?: string
  education_level?: string
  relationship_to_student?: string
  emergency_contact: boolean
  created_at: string
  updated_at: string
}
