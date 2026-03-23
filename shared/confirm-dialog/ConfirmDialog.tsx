'use client'

import { AlertTriangle, X } from "lucide-react"

interface ConfirmDialogProps {
  isOpen: boolean
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

export const ConfirmDialog = ({
  isOpen,
  title,
  description,
  confirmLabel = 'Удалить',
  cancelLabel = 'Отмена',
  onConfirm,
  onCancel,
  isLoading = false,
}: ConfirmDialogProps) => {
  if (!isOpen) return null

  return (
    // Backdrop
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={onCancel}
    >
      {/* Диалог */}
      <div
        className="relative bg-white rounded-xl shadow-xl p-6 w-full max-w-sm mx-4 animate-fade-in"
        onClick={(e) => e.stopPropagation()}  // клик внутри не закрывает
      >
        {/* Крестик */}
        <button
          onClick={onCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Иконка */}
        <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 mx-auto mb-4">
          <AlertTriangle className="w-6 h-6 text-red-500" />
        </div>

        {/* Текст */}
        <h2 className="text-center text-lg font-bold text-gray-800 mb-1">{title}</h2>
        {description && (
          <p className="text-center text-sm text-gray-500 mb-6">{description}</p>
        )}

        {/* Кнопки */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="flex-1 py-2 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors duration-200 disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="flex-1 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading
              ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Удаление...</>
              : confirmLabel
            }
          </button>
        </div>
      </div>
    </div>
  )
}