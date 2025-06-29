// 统一错误处理系统
export enum ErrorType {
  VALIDATION = "VALIDATION",
  AUTHENTICATION = "AUTHENTICATION",
  AUTHORIZATION = "AUTHORIZATION",
  DATABASE = "DATABASE",
  NETWORK = "NETWORK",
  SYSTEM = "SYSTEM",
  USER_INPUT = "USER_INPUT",
}

export interface AppError {
  type: ErrorType
  code: string
  message: string
  details?: any
  timestamp: Date
  userId?: string
  context?: Record<string, any>
}

export class ErrorManager {
  private static instance: ErrorManager
  private errorLog: AppError[] = []

  private constructor() {}

  public static getInstance(): ErrorManager {
    if (!ErrorManager.instance) {
      ErrorManager.instance = new ErrorManager()
    }
    return ErrorManager.instance
  }

  // 创建错误
  public createError(
    type: ErrorType,
    code: string,
    message: string,
    details?: any,
    context?: Record<string, any>,
  ): AppError {
    const error: AppError = {
      type,
      code,
      message,
      details,
      timestamp: new Date(),
      context,
    }

    this.logError(error)
    return error
  }

  // 记录错误
  private logError(error: AppError) {
    this.errorLog.push(error)

    // 控制台输出（开发环境）
    if (process.env.NODE_ENV === "development") {
      console.error("App Error:", error)
    }

    // 发送到错误监控服务（生产环境）
    if (process.env.NODE_ENV === "production") {
      this.sendToMonitoring(error)
    }
  }

  // 发送到监控服务
  private async sendToMonitoring(error: AppError) {
    try {
      // 这里可以集成 Sentry、LogRocket 等监控服务
      console.log("Sending error to monitoring service:", error)
    } catch (monitoringError) {
      console.error("Failed to send error to monitoring:", monitoringError)
    }
  }

  // 获取用户友好的错误消息
  public getUserFriendlyMessage(error: AppError): string {
    const messageMap: Record<string, string> = {
      // 验证错误
      VALIDATION_EMAIL_INVALID: "请输入有效的邮箱地址",
      VALIDATION_PASSWORD_WEAK: "密码强度不足，请包含字母、数字和特殊字符",
      VALIDATION_REQUIRED_FIELD: "请填写必填字段",

      // 认证错误
      AUTH_INVALID_CREDENTIALS: "邮箱或密码错误，请重试",
      AUTH_USER_NOT_FOUND: "用户不存在，请检查邮箱地址",
      AUTH_EMAIL_NOT_VERIFIED: "请先验证您的邮箱地址",

      // 数据库错误
      DB_CONNECTION_FAILED: "连接服务器失败，请稍后重试",
      DB_QUERY_TIMEOUT: "操作超时，请稍后重试",
      DB_CONSTRAINT_VIOLATION: "数据格式不正确，请检查输入",

      // 网络错误
      NETWORK_TIMEOUT: "网络连接超时，请检查网络状态",
      NETWORK_OFFLINE: "网络连接已断开，请检查网络设置",

      // 系统错误
      SYSTEM_MAINTENANCE: "系统维护中，请稍后访问",
      SYSTEM_OVERLOAD: "系统繁忙，请稍后重试",
    }

    return messageMap[error.code] || "操作失败，请稍后重试"
  }

  // 获取错误统计
  public getErrorStats() {
    const stats = {
      total: this.errorLog.length,
      byType: {} as Record<ErrorType, number>,
      recent: this.errorLog.slice(-10),
    }

    this.errorLog.forEach((error) => {
      stats.byType[error.type] = (stats.byType[error.type] || 0) + 1
    })

    return stats
  }
}

export const errorManager = ErrorManager.getInstance()
