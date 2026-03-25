'use client'

import { createContext, useCallback, useContext, useState } from 'react'
import { SnackbarContainer } from './Snackbar'
import type { SnackbarItem, SnackbarType } from './Snackbar'

interface SnackbarContextValue {
  show: (message: string, type?: SnackbarType, duration?: number) => void
  success: (message: string, duration?: number) => void
  error: (message: string, duration?: number) => void
  warning: (message: string, duration?: number) => void
  info: (message: string, duration?: number) => void
}

const SnackbarContext = createContext<SnackbarContextValue | null>(null)

export function SnackbarProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<SnackbarItem[]>([])

  const remove = useCallback((id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }, [])

  const show = useCallback((message: string, type: SnackbarType = 'info', duration?: number) => {
    const id = crypto.randomUUID()
    setItems(prev => [...prev, { id, message, type, duration }])
  }, [])

  const success = useCallback((msg: string, duration?: number) => show(msg, 'success', duration), [show])
  const error   = useCallback((msg: string, duration?: number) => show(msg, 'error', duration), [show])
  const warning = useCallback((msg: string, duration?: number) => show(msg, 'warning', duration), [show])
  const info    = useCallback((msg: string, duration?: number) => show(msg, 'info', duration), [show])

  return (
    <SnackbarContext.Provider value={{ show, success, error, warning, info }}>
      {children}
      <SnackbarContainer items={items} onRemove={remove} />
    </SnackbarContext.Provider>
  )
}

export function useSnackbar() {
  const ctx = useContext(SnackbarContext)
  if (!ctx) throw new Error('useSnackbar must be used within SnackbarProvider')
  return ctx
}
