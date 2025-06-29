"use client"

import { createContext, useContext, useState, useCallback, type ReactNode } from "react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { CheckCircle, AlertTriangle, Info, X, AlertCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export type ToastType = "success" | "error" | "warning" | "info"

export interface Toast {
  id: string
  type: ToastType
  title?: string
  message: string
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextType {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, "id">) => void
  removeToast: (id: string) => void
  clearAllToasts: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const newToast: Toast = {
      ...toast,
      id,
      duration: toast.duration || 5000,
    }

    setToasts((prev) => [...prev, newToast])

    // 自动移除toast
    if (newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }, [])

  const clearAllToasts = useCallback(() => {
    setToasts([])
  }, [])

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, clearAllToasts }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  )
}

function ToastContainer() {
  const { toasts, removeToast } = useToast()

  if (toasts.length === 0) return null

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm w-full">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onRemove={removeToast} />
      ))}
    </div>
  )
}

function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const getIcon = () => {
    switch (toast.type) {
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-600" />
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "info":
        return <Info className="h-4 w-4 text-blue-600" />
    }
  }

  const getVariant = () => {
    switch (toast.type) {
      case "error":
        return "destructive"
      default:
        return "default"
    }
  }

  const getBgColor = () => {
    switch (toast.type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      case "warning":
        return "bg-yellow-50 border-yellow-200"
      case "info":
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <Alert className={cn("animate-slide-in-right shadow-lg", getBgColor())} variant={getVariant()}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-2">
          {getIcon()}
          <div className="flex-1">
            {toast.title && <div className="font-semibold text-sm mb-1">{toast.title}</div>}
            <AlertDescription className="text-sm">{toast.message}</AlertDescription>
            {toast.action && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 h-auto p-0 text-xs underline"
                onClick={toast.action.onClick}
              >
                {toast.action.label}
              </Button>
            )}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="h-auto p-1 hover:bg-transparent"
          onClick={() => onRemove(toast.id)}
        >
          <X className="h-3 w-3" />
        </Button>
      </div>
    </Alert>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

// 便捷方法
export function useToastHelpers() {
  const { addToast } = useToast()

  return {
    success: (message: string, title?: string) => addToast({ type: "success", message, title }),

    error: (message: string, title?: string) => addToast({ type: "error", message, title }),

    warning: (message: string, title?: string) => addToast({ type: "warning", message, title }),

    info: (message: string, title?: string) => addToast({ type: "info", message, title }),
  }
}
