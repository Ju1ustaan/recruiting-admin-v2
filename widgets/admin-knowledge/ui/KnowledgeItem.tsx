'use client'

import { useState } from "react"
import { Pencil, Trash2, Check, X, Loader, PlusCircle, ChevronRight } from "lucide-react"
import { KnowledgeDto } from "@/entities/vacancy-tests"
import { ConfirmDialog } from "@/shared/ui/confirm-dialog"
import { useKnowledgeLevels } from "../model/useKnowledgeLevels"

interface KnowledgeItemProps {
    knowledge: KnowledgeDto
    knowledgeGroupId: number
    isDeleting: boolean
    isUpdating: boolean
    onUpdate: (dto: { knowledgeId: number, knowledgeText: string }) => void
    onDelete: (knowledgeId: number) => void
}

export const KnowledgeItem = ({
    knowledge,
    knowledgeGroupId,
    isDeleting,
    isUpdating,
    onUpdate,
    onDelete,
}: KnowledgeItemProps) => {
    const { createLevel, isCreating, updateLevel, isUpdating: isUpdatingLevel, deleteLevel, deletingLevelId, isDeleting: isDeletingLevel } = useKnowledgeLevels(knowledgeGroupId)

    const [isOpen, setIsOpen] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)

    // ─── Редактирование знания ────────────────────────
    const [isEditing, setIsEditing] = useState(false)
    const [text, setText] = useState(knowledge.knowledgeText)

    const handleSave = () => {
        onUpdate({ knowledgeId: knowledge.knowledgeId, knowledgeText: text })
        setIsEditing(false)
    }

    const handleCancel = () => {
        setText(knowledge.knowledgeText)
        setIsEditing(false)
    }

    // ─── Новый уровень ────────────────────────────────
    const [newLevelText, setNewLevelText] = useState('')

    const handleCreateLevel = () => {
        if (!newLevelText.trim()) return
        createLevel(
            { knowledgeLevelText: newLevelText.trim(), knowledgeId: knowledge.knowledgeId },
            { onSuccess: () => setNewLevelText('') }
        )
    }

    // ─── Редактирование уровня ────────────────────────
    const [editingLevelId, setEditingLevelId] = useState<number | null>(null)
    const [editLevelText, setEditLevelText] = useState('')

    const handleSaveLevel = (levelId: number) => {
        // /vacancy/question/saveQuestionAnswer
            //  answerText: "1 киллограм"
            //  isTrue: false
            //  questionId: 32
        // /vacancy/question/saveQuestionAnswer
        updateLevel(
            { knowledgeLevelId: levelId, knowledgeLevelText: editLevelText, knowledgeId: knowledge.knowledgeId },
            { onSuccess: () => setEditingLevelId(null) }
        )
    }

    return (
        <>
            <div className="border-b border-gray-100 pb-2 mb-1">

                {/* ─── Строка знания ─── */}
                <div className="flex items-center gap-2 py-1.5 px-3 group hover:bg-gray-50 rounded-lg transition-colors">

                    {/* Раскрыть уровни */}
                    <button onClick={() => setIsOpen(!isOpen)} className="shrink-0 text-gray-400 hover:text-gray-600">
                        <ChevronRight className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-90' : ''}`} />
                    </button>

                    {isEditing ? (
                        <input
                            autoFocus
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSave()
                                if (e.key === 'Escape') handleCancel()
                            }}
                            className="flex-1 p-1 text-sm rounded border border-blue-300 outline-blue-400"
                        />
                    ) : (
                        <p className="flex-1 text-sm text-gray-700 font-medium">{knowledge.knowledgeText}</p>
                    )}

                    <div className="flex items-center gap-1 shrink-0">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} disabled={isUpdating} className="p-1 rounded text-white bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-50">
                                    {isUpdating ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                </button>
                                <button onClick={handleCancel} className="p-1 rounded text-gray-400 hover:bg-gray-200 transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="p-1 rounded text-gray-300 hover:text-blue-500 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all">
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => setShowConfirm(true)} disabled={isDeleting} className="p-1 rounded text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50">
                                    {isDeleting ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Trash2 className="w-3.5 h-3.5" />}
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* ─── Уровни ─── */}
                {isOpen && (
                    <div className="ml-10 mt-1 space-y-1.5">
                        {knowledge.knowledgeLevels.map((level) => (
                            <div key={level.knowledgeLevelId} className="flex items-center gap-2 group/level">
                                {editingLevelId === level.knowledgeLevelId ? (
                                    <>
                                        <input
                                            autoFocus
                                            value={editLevelText}
                                            onChange={(e) => setEditLevelText(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleSaveLevel(level.knowledgeLevelId)
                                                if (e.key === 'Escape') setEditingLevelId(null)
                                            }}
                                            className="flex-1 p-1 text-sm rounded border border-blue-300 outline-blue-400"
                                        />
                                        <button onClick={() => handleSaveLevel(level.knowledgeLevelId)} disabled={isUpdatingLevel} className="p-1 rounded text-white bg-green-500 hover:bg-green-600 disabled:opacity-50">
                                            {isUpdatingLevel ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                        </button>
                                        <button onClick={() => setEditingLevelId(null)} className="p-1 rounded text-gray-400 hover:bg-gray-200">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <span className="flex-1 text-xs text-gray-500 py-1 px-2 bg-gray-100 rounded-lg">{level.knowledgeLevelText}</span>
                                        <button
                                            onClick={() => { setEditingLevelId(level.knowledgeLevelId); setEditLevelText(level.knowledgeLevelText) }}
                                            className="p-1 rounded text-gray-300 hover:text-blue-500 hover:bg-blue-50 opacity-0 group-hover/level:opacity-100 transition-all"
                                        >
                                            <Pencil className="w-3 h-3" />
                                        </button>
                                        <button
                                            onClick={() => deleteLevel(level.knowledgeLevelId)}
                                            disabled={isDeletingLevel && deletingLevelId === level.knowledgeLevelId}
                                            className="p-1 rounded text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover/level:opacity-100 transition-all disabled:opacity-50"
                                        >
                                            {isDeletingLevel && deletingLevelId === level.knowledgeLevelId
                                                ? <Loader className="w-3 h-3 animate-spin" />
                                                : <Trash2 className="w-3 h-3" />
                                            }
                                        </button>
                                    </>
                                )}
                            </div>
                        ))}

                        {/* Добавить уровень */}
                        <div className="flex items-center gap-2">
                            <input
                                type="text"
                                placeholder="Новый уровень..."
                                value={newLevelText}
                                onChange={(e) => setNewLevelText(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleCreateLevel()}
                                className="flex-1 p-1 text-sm rounded-lg border border-gray-200 outline-blue-400"
                            />
                            <button
                                onClick={handleCreateLevel}
                                disabled={isCreating || !newLevelText.trim()}
                                className="p-1 rounded text-gray-300 hover:text-green-500 transition-colors disabled:opacity-30"
                            >
                                {isCreating ? <Loader className="w-4 h-4 animate-spin" /> : <PlusCircle className="w-4 h-4" />}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <ConfirmDialog
                isOpen={showConfirm}
                title="Удалить знание?"
                description={`"${knowledge.knowledgeText}"`}
                isLoading={isDeleting}
                onConfirm={() => { onDelete(knowledge.knowledgeId); setShowConfirm(false) }}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    )
}