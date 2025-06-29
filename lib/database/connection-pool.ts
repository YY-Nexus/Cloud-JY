// 数据库连接池优化
import { createClient } from "@supabase/supabase-js"

interface DatabaseConfig {
  url: string
  anonKey: string
  serviceRoleKey?: string
  options?: {
    auth: {
      autoRefreshToken: boolean
      persistSession: boolean
      detectSessionInUrl: boolean
    }
    db: {
      schema: string
    }
    global: {
      headers: Record<string, string>
    }
  }
}

class DatabaseConnectionManager {
  private static instance: DatabaseConnectionManager
  private supabaseClient: any
  private serviceClient: any
  private connectionConfig: DatabaseConfig

  private constructor() {
    this.initializeConnection()
  }

  public static getInstance(): DatabaseConnectionManager {
    if (!DatabaseConnectionManager.instance) {
      DatabaseConnectionManager.instance = new DatabaseConnectionManager()
    }
    return DatabaseConnectionManager.instance
  }

  private initializeConnection() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://demo.supabase.co"
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "demo-anon-key"
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    this.connectionConfig = {
      url: supabaseUrl,
      anonKey: supabaseAnonKey,
      serviceRoleKey: supabaseServiceKey,
      options: {
        auth: {
          autoRefreshToken: true,
          persistSession: true,
          detectSessionInUrl: true,
        },
        db: {
          schema: "public",
        },
        global: {
          headers: {
            "X-Client-Info": "yanyu-cloud-education",
          },
        },
      },
    }

    // 客户端连接（用于前端）
    this.supabaseClient = createClient(
      this.connectionConfig.url,
      this.connectionConfig.anonKey,
      this.connectionConfig.options,
    )

    // 服务端连接（用于管理员操作）
    if (this.connectionConfig.serviceRoleKey) {
      this.serviceClient = createClient(this.connectionConfig.url, this.connectionConfig.serviceRoleKey, {
        ...this.connectionConfig.options,
        auth: {
          autoRefreshToken: false,
          persistSession: false,
          detectSessionInUrl: false,
        },
      })
    }
  }

  // 获取客户端连接
  public getClient() {
    return this.supabaseClient
  }

  // 获取服务端连接
  public getServiceClient() {
    if (!this.serviceClient) {
      throw new Error("Service role key not configured")
    }
    return this.serviceClient
  }

  // 健康检查
  public async healthCheck(): Promise<boolean> {
    try {
      const { data, error } = await this.supabaseClient.from("user_profiles").select("count").limit(1)

      return !error
    } catch (error) {
      console.error("Database health check failed:", error)
      return false
    }
  }

  // 连接重试机制
  public async retryConnection(maxRetries = 3): Promise<boolean> {
    for (let i = 0; i < maxRetries; i++) {
      const isHealthy = await this.healthCheck()
      if (isHealthy) {
        return true
      }

      console.log(`Connection attempt ${i + 1} failed, retrying...`)
      await new Promise((resolve) => setTimeout(resolve, 1000 * (i + 1)))
    }

    return false
  }
}

export const dbManager = DatabaseConnectionManager.getInstance()
export const supabase = dbManager.getClient()
