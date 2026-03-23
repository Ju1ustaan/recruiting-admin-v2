'use client'

import { useState } from "react"
import { Loader, XCircle, AlertTriangle } from "lucide-react"

interface FilterItemProps {
  label: string
  isDeleting: boolean
  onDelete: () => void
}

export const FilterItem = ({ label, isDeleting, onDelete }: FilterItemProps) => {
  const [confirm, setConfirm] = useState(false)

  const handleDelete = () => {
    if (!confirm) {
      setConfirm(true)
      setTimeout(() => setConfirm(false), 3000)
      return
    }
    onDelete()
    setConfirm(false)
  }

  return (
    <div className={`py-1 px-5 rounded-lg flex items-center gap-2 transition-colors duration-200
      ${confirm ? 'bg-red-400' : 'bg-gray-400'}`}
    >
      <p className="text-white text-sm">{confirm ? 'Удалить?' : label}</p>

      <button onClick={handleDelete} disabled={isDeleting}>
        {isDeleting
          ? <Loader className="w-5 h-5 text-gray-300 animate-spin" />
          : confirm
            ? <AlertTriangle className="w-5 h-5 text-white animate-pulse" />
            : <XCircle className="w-5 h-5 text-gray-300 hover:text-red-400 duration-300" />
        }
      </button>
    </div>
  )
}