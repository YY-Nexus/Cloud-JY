import { supabase } from "./supabase"

export interface EmailVerificationService {
  sendVerificationEmail: (email: string) => Promise<{ error: any }>
  verifyEmail: (token: string) => Promise<{ error: any }>
  resendVerificationEmail: (email: string) => Promise<{ error: any }>
  checkEmailVerificationStatus: (userId: string) => Promise<{ verified: boolean; error: any }>
}

export class SupabaseEmailVerification implements EmailVerificationService {
  async sendVerificationEmail(email: string) {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/verify-email`,
        },
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  async verifyEmail(token: string) {
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: token,
        type: "email",
      })

      return { error }
    } catch (error) {
      return { error }
    }
  }

  async resendVerificationEmail(email: string) {
    return this.sendVerificationEmail(email)
  }

  async checkEmailVerificationStatus(userId: string) {
    try {
      const { data: user, error } = await supabase.auth.getUser()

      if (error) {
        return { verified: false, error }
      }

      return {
        verified: user.user?.email_confirmed_at !== null,
        error: null,
      }
    } catch (error) {
      return { verified: false, error }
    }
  }
}

// 演示模式的邮箱验证服务
export class DemoEmailVerification implements EmailVerificationService {
  async sendVerificationEmail(email: string) {
    // 模拟发送邮件
    console.log(`演示模式：发送验证邮件到 ${email}`)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return { error: null }
  }

  async verifyEmail(token: string) {
    // 模拟验证
    console.log(`演示模式：验证令牌 ${token}`)
    await new Promise((resolve) => setTimeout(resolve, 500))
    return { error: null }
  }

  async resendVerificationEmail(email: string) {
    return this.sendVerificationEmail(email)
  }

  async checkEmailVerificationStatus(userId: string) {
    // 演示模式总是返回已验证
    return { verified: true, error: null }
  }
}

// 根据环境选择服务
const isDemoMode =
  !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL === "https://demo.supabase.co"

export const emailVerification: EmailVerificationService = isDemoMode
  ? new DemoEmailVerification()
  : new SupabaseEmailVerification()
