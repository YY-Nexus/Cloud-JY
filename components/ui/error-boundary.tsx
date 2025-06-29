"use client"

import type React from "react"
import { Component, type ErrorInfo, type ReactNode } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertTriangle, RefreshCw, Home } from "lucide-react"
import { errorManager, ErrorType } from "@/lib/error-handling/error-manager"

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error?: Error
  errorId?: string
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `error_${Date.now()}`,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 记录错误到错误管理系统
    const appError = errorManager.createError(
      ErrorType.SYSTEM,
      "REACT_ERROR_BOUNDARY",
      error.message,
      {
        stack: error.stack,
        componentStack: errorInfo.componentStack,
      },
      {
        errorBoundary: true,
        timestamp: new Date().toISOString(),
      },
    )

    // 调用外部错误处理函数
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    console.error("Error Boundary caught an error:", error, errorInfo)
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined })
  }

  handleGoHome = () => {
    window.location.href = "/"
  }

  render() {
    if (this.state.hasError) {
      // 如果提供了自定义fallback，使用它
      if (this.props.fallback) {
        return this.props.fallback
      }

      // 默认错误UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <AlertTriangle className="w-8 h-8 text-red-600" />
              </div>
              <CardTitle className="text-xl text-red-800">出现了一些问题</CardTitle>
              <CardDescription>应用程序遇到了意外错误，我们已经记录了这个问题</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert variant="destructive">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription>
                  错误ID: {this.state.errorId}
                  <br />
                  {process.env.NODE_ENV === "development" && this.state.error?.message}
                </AlertDescription>
              </Alert>

              <div className="flex gap-2">
                <Button onClick={this.handleRetry} className="flex-1" variant="outline">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  重试
                </Button>
                <Button onClick={this.handleGoHome} className="flex-1">
                  <Home className="w-4 h-4 mr-2" />
                  返回首页
                </Button>
              </div>

              <div className="text-xs text-gray-500 text-center">如果问题持续存在，请联系技术支持</div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}

// 高阶组件包装器
export function withErrorBoundary<P extends object>(Component: React.ComponentType<P>, errorFallback?: ReactNode) {
  return function WrappedComponent(props: P) {
    return (
      <ErrorBoundary fallback={errorFallback}>
        <Component {...props} />
      </ErrorBoundary>
    )
  }
}
