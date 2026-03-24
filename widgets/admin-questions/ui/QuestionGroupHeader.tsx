'use client'

import { useState } from "react"
import { ChevronRight, XCircle, PencilIcon, Check, X } from "lucide-react"
import { ConfirmDialog } from "@/shared/confirm-dialog"
import { UpdateQuestionGroupDto } from "@/entities/vacancy-tests/model/types"

interface QuestionGroupHeaderProps {
    label: string
    id?: number
    passingScore?: number
    onDelete: () => void
    onToggle?: () => void
    isOpen?: boolean
    isDeleting: boolean
    onUpdate: (name: string, passingScore: number) => void  // ← просто примитивы
}

export const QuestionGroupHeader = ({
    label, passingScore = 0, onDelete, onToggle, isOpen, id = 0, isDeleting, onUpdate
}: QuestionGroupHeaderProps) => {
    const [confirmId, setConfirmId] = useState<number | null>(null)
    const [showEdit, setShowEdit] = useState(false)

    // Локальные стейты для редактирования
    const [editName, setEditName] = useState(label)
    const [editScore, setEditScore] = useState(passingScore)

  const handleSave = () => {
    onUpdate(editName, editScore)  // ← передаём примитивы
    setShowEdit(false)
}

    const handleCancel = () => {
        setEditName(label)
        setEditScore(passingScore)
        setShowEdit(false)
    }

    return (
        <>
            <div className={`flex items-center justify-between bg-blue-100 p-3 rounded-t-lg
                ${!isOpen ? 'rounded-b-lg' : 'rounded-b-none'}`}
            >
                {/* Название */}
                <div className="flex items-center gap-1 w-2/5">
                    <button onClick={onToggle} className="p-1 shrink-0">
                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                    </button>
                    {showEdit
                        ? <input
                            autoFocus
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="flex-1 border border-blue-300 p-1 rounded text-sm outline-blue-400"
                          />
                        : <p className="font-bold capitalize text-sm">{label}</p>
                    }
                </div>

                {/* Проходной балл */}
                <div className="flex items-center gap-3 w-2/5">
                    {
                        passingScore !== 0 && (
                            showEdit ? (
                        <div className="flex items-center gap-2 flex-1">
                            <input
                                type="range"
                                min="0" max="100"
                                value={editScore}
                                onChange={(e) => setEditScore(Number(e.target.value))}
                                className="flex-1 accent-blue-500"
                            />
                            <span className="text-sm font-semibold w-8 text-center">{editScore}</span>
                        </div>
                    ) : (
                        <p className="text-sm">
                            Проходной балл: <span className="font-semibold">{passingScore}</span>
                        </p>
                    )
                        )
                    }

                    {/* Кнопки редактирования */}
                    {showEdit ? (
                        <div className="flex items-center gap-1">
                            <button onClick={handleSave} className="p-1 rounded text-white bg-green-500 hover:bg-green-600 transition-colors">
                                <Check className="w-4 h-4" />
                            </button>
                            <button onClick={handleCancel} className="p-1 rounded text-gray-500 hover:bg-gray-200 transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    ) : (
                        <button onClick={() => setShowEdit(true)} className="p-1 rounded text-gray-400 hover:text-blue-500 hover:bg-blue-200 transition-colors">
                            <PencilIcon className="w-4 h-4" />
                        </button>
                    )}
                </div>

                {/* Удалить */}
                <button
                    onClick={() => setConfirmId(id)}
                    disabled={isDeleting}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-500 rounded-lg
                        border border-red-200 hover:bg-red-500 hover:text-white hover:border-transparent
                        transition-all duration-200 disabled:opacity-50"
                >
                    <XCircle className="w-4 h-4" />
                    <span>Удалить</span>
                </button>
            </div>

            <ConfirmDialog
                isOpen={confirmId !== null}
                title="Удалить группу?"
                isLoading={isDeleting}
                description="Это действие нельзя отменить"
                onConfirm={() => { onDelete(); setConfirmId(null) }}
                onCancel={() => setConfirmId(null)}
            />
        </>
    )
}