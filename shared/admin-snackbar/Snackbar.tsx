'use client'

import { useEffect, useState } from 'react'
import { CheckCircle, XCircle, AlertTriangle, Info, X } from 'lucide-react'

export type SnackbarType = 'success' | 'error' | 'warning' | 'info'

export interface SnackbarItem {
  id: string
  message: string
  type: SnackbarType
  duration?: number
}

interface SnackbarProps {
  items: SnackbarItem[]
  onRemove: (id: string) => void
}

const config: Record<SnackbarType, { icon: React.ReactNode; classes: string; bar: string }> = {
  success: {
    icon: <CheckCircle className="w-4 h-4 shrink-0" />,
    classes: 'bg-zinc-900 text-emerald-400 border-emerald-500/30',
    bar: 'bg-emerald-500',
  },
  error: {
    icon: <XCircle className="w-4 h-4 shrink-0" />,
    classes: 'bg-zinc-900 text-red-400 border-red-500/30',
    bar: 'bg-red-500',
  },
  warning: {
    icon: <AlertTriangle className="w-4 h-4 shrink-0" />,
    classes: 'bg-zinc-900 text-amber-400 border-amber-500/30',
    bar: 'bg-amber-500',
  },
  info: {
    icon: <Info className="w-4 h-4 shrink-0" />,
    classes: 'bg-zinc-900 text-blue-400 border-blue-500/30',
    bar: 'bg-blue-500',
  },
}

function SnackbarSingle({ item, onRemove }: { item: SnackbarItem; onRemove: (id: string) => void }) {
  const [visible, setVisible] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const duration = item.duration ?? 3500
  const { icon, classes, bar } = config[item.type]

  useEffect(() => {
    // Вход
    const enterTimer = setTimeout(() => setVisible(true), 10)

    // Выход
    const leaveTimer = setTimeout(() => {
      setLeaving(true)
      setTimeout(() => onRemove(item.id), 350)
    }, duration)

    return () => {
      clearTimeout(enterTimer)
      clearTimeout(leaveTimer)
    }
  }, [item.id, duration, onRemove])

  const handleClose = () => {
    setLeaving(true)
    setTimeout(() => onRemove(item.id), 350)
  }

  return (
    <div
      className={`
        relative flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl
        min-w-\[280px\] max-w-\[420px\] overflow-hidden
        transition-all duration-350 ease-out
        ${classes}
        ${visible && !leaving
          ? 'opacity-100 translate-x-0 scale-100'
          : 'opacity-0 translate-x-8 scale-95'
        }
      `}
      style={{ transition: 'opacity 0.35s ease, transform 0.35s ease' }}
    >
      {/* Иконка */}
      {icon}

      {/* Текст */}
      <p className="flex-1 text-sm font-medium text-zinc-100 leading-snug">
        {item.message}
      </p>

      {/* Закрыть */}
      <button
        onClick={handleClose}
        className="text-zinc-500 hover:text-zinc-200 transition-colors ml-1 shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>

      {/* Прогресс-бар */}
      <div
        className={`absolute bottom-0 left-0 h-\[2px\] ${bar} opacity-60`}
        style={{
          animation: `snackbar-progress ${duration}ms linear forwards`,
        }}
      />

      <style>{`
        @keyframes snackbar-progress {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

export function SnackbarContainer({ items, onRemove }: SnackbarProps) {
  return (
    <div className="fixed bottom-5 right-5 z-\[9999\] flex flex-col gap-2 items-end pointer-events-none">
      {items.map(item => (
        <div key={item.id} className="pointer-events-auto">
          <SnackbarSingle item={item} onRemove={onRemove} />
        </div>
      ))}
    </div>
  )
}
