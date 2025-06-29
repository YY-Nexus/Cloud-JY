"use client"

// 加载状态管理系统
import { createContext, useContext, useState, useCallback, type ReactNode } from "react"

export interface LoadingState {
  id: string
  message?: string
  progress?: number
  type: "spinner" | "progress" | "skeleton"
}

interface LoadingContextType {
  loadingStates: LoadingState[]
  startLoading: (id: string, message?: string, type?: LoadingState["type"]) => void
  updateLoading: (id: string, progress: number, message?: string) => void
  stopLoading: (id: string) => void
  isLoading: (id?: string) => boolean
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined)

export function LoadingProvider({ children }: { children: ReactNode }) {
  const [loadingStates, setLoadingStates] = useState<LoadingState[]>([])

  const startLoading = useCallback((id: string, message?: string, type: LoadingState["type"] = "spinner") => {
    setLoadingStates((prev) => {
      const existing = prev.find((state) => state.id === id)
      if (existing) {
        return prev.map((state) => (state.id === id ? { ...state, message, type } : state))
      }
      return [...prev, { id, message, type, progress: 0 }]
    })
  }, [])

  const updateLoading = useCallback((id: string, progress: number, message?: string) => {
    setLoadingStates((prev) =>
      prev.map((state) => (state.id === id ? { ...state, progress, message: message || state.message } : state)),
    )
  }, [])

  const stopLoading = useCallback((id: string) => {
    setLoadingStates((prev) => prev.filter((state) => state.id !== id))
  }, [])

  const isLoading = useCallback(
    (id?: string) => {
      if (id) {
        return loadingStates.some((state) => state.id === id)
      }
      return loadingStates.length > 0
    },
    [loadingStates],
  )

  return (
    <LoadingContext.Provider
      value={{
        loadingStates,
        startLoading,
        updateLoading,
        stopLoading,
        isLoading,
      }}
    >
      {children}
    </LoadingContext.Provider>
  )
}

export function useLoading() {
  const context = useContext(LoadingContext)
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider")
  }
  return context
}

// 便捷的加载Hook
export function useAsyncOperation() {
  const { startLoading, stopLoading, updateLoading } = useLoading()

  const executeWithLoading = useCallback(
    async <T,>(
      operation: (updateProgress?: (progress: number, message?: string) => void) => Promise<T>,
      loadingId: string,
      initialMessage?: string,
    ): Promise<T> => {
      try {
        startLoading(loadingId, initialMessage)

        const updateProgress = (progress: number, message?: string) => {
          updateLoading(loadingId, progress, message)
        }

        const result = await operation(updateProgress)
        return result
      } finally {
        stopLoading(loadingId)
      }
    },
    [startLoading, stopLoading, updateLoading],
  )

  return { executeWithLoading }
}
