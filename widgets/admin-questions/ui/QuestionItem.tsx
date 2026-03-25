'use client'

import { useState } from "react"
import { Pencil, Trash2, Check, X, Loader, PlusCircle, CheckCircle, ImageIcon } from "lucide-react"
import { Question, UpdateQuestionDto } from "@/entities/vacancy-tests/model/types"
import { ConfirmDialog } from "@/shared/ui/confirm-dialog"
import { useQuestionAnswers } from "../model/useQuestionAnswers"

interface QuestionItemProps {
    question: Question
    questionGroupId: number
    isDeleting: boolean
    isUpdating: boolean
    onUpdate: (dto: UpdateQuestionDto) => void
    onDelete: (id: number) => void
}

export const QuestionItem = ({
    question,
    questionGroupId,
    isDeleting,
    isUpdating,
    onUpdate,
    onDelete,
}: QuestionItemProps) => {
    const {
        createAnswer, isCreating,
        savePicture,
        isSavingPicture,
        updateAnswer, isUpdating: isUpdatingAnswer,
        deleteAnswer, deletingAnswerId, isDeleting: isDeletingAnswer,
    } = useQuestionAnswers(questionGroupId, question.questionId)

    // ─── Вопрос ───────────────────────────────────────
    const [isEditing, setIsEditing] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [text, setText] = useState(question.questionText)

    // ─── Новый ответ ──────────────────────────────────
    const [newAnswerText, setNewAnswerText] = useState('')
    const [newAnswerIsTrue, setNewAnswerIsTrue] = useState(false)

    // ─── Редактирование ответа ────────────────────────
    const [editingAnswerId, setEditingAnswerId] = useState<number | null>(null)
    const [editAnswerText, setEditAnswerText] = useState('')
    const [editAnswerIsTrue, setEditAnswerIsTrue] = useState(false)

    const handleSaveQuestion = () => {
        onUpdate({
            questionId: question.questionId,
            questionText: text,
            milliseconds: question.milliseconds,
            numbering: question.numbering,
            questionGroupId,
        })
        setIsEditing(false)
    }

    const handleCancelQuestion = () => {
        setText(question.questionText)
        setIsEditing(false)
    }

    const handleCreateAnswer = () => {
        if (!newAnswerText.trim()) return
        createAnswer(
            { answerText: newAnswerText.trim(), isTrue: newAnswerIsTrue },
            {
                onSuccess: () => {
                    setNewAnswerText('')
                    setNewAnswerIsTrue(false)
                }
            }
        )
    }

    const startEditAnswer = (answer: { answerId: number, answerText: string, isTrue: boolean }) => {
        setEditingAnswerId(answer.answerId)
        setEditAnswerText(answer.answerText)
        setEditAnswerIsTrue(answer.isTrue)
    }

    const handleSaveAnswer = (answerId: number) => {
        updateAnswer(
            { answerId, answerText: editAnswerText, isTrue: editAnswerIsTrue },
            { onSuccess: () => setEditingAnswerId(null) }
        )
    }

    const handleCancelAnswer = () => {
        setEditingAnswerId(null)
        setEditAnswerText('')
        setEditAnswerIsTrue(false)
    }

    return (
        <>
            <div className="rounded-lg hover:bg-gray-50 group transition-colors border-b border-gray-100 pb-2 mb-1">

                {/* ─── Вопрос ─── */}
                <div className="flex items-center gap-3 py-2 px-3">
                    <span className="text-xs text-gray-400 w-5 shrink-0">{question.numbering}.</span>

                    {isEditing ? (
                        <input
                            autoFocus
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') handleSaveQuestion()
                                if (e.key === 'Escape') handleCancelQuestion()
                            }}
                            className="flex-1 p-1 text-sm rounded border border-blue-300 outline-blue-400"
                        />
                    ) : (
                        <p className="flex-1 text-sm text-gray-700">{question.questionText}</p>
                    )}

                    <div className="flex items-center gap-1 shrink-0">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSaveQuestion}
                                    disabled={isUpdating}
                                    className="p-1 rounded text-white bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-50"
                                >
                                    {isUpdating
                                        ? <Loader className="w-3.5 h-3.5 animate-spin" />
                                        : <Check className="w-3.5 h-3.5" />
                                    }
                                </button>
                                <button onClick={handleCancelQuestion} className="p-1 rounded text-gray-400 hover:bg-gray-200 transition-colors">
                                    <X className="w-3.5 h-3.5" />
                                </button>

                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-1 rounded text-gray-300 hover:text-blue-500 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    disabled={isDeleting}
                                    className="p-1 rounded text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                                >
                                    {isDeleting
                                        ? <Loader className="w-3.5 h-3.5 animate-spin" />
                                        : <Trash2 className="w-3.5 h-3.5" />
                                    }
                                </button>
                            </>
                        )}
                    </div>
                </div>

                {/* ─── Существующие ответы ─── */}
                <div className="px-8 space-y-1.5 mb-2">
                    {question.questionAnswers.map((answer) => (
                        <div key={answer.answerId} className="flex items-center gap-2 group/answer">

                            {editingAnswerId === answer.answerId ? (
                                <>
                                    {/* Чекбокс isTrue */}
                                    <button
                                        onClick={() => setEditAnswerIsTrue(!editAnswerIsTrue)}
                                        className={`shrink-0 transition-colors ${editAnswerIsTrue ? 'text-green-500' : 'text-gray-300'}`}
                                    >
                                        <CheckCircle className="w-4 h-4" />
                                    </button>

                                    <input
                                        autoFocus
                                        value={editAnswerText}
                                        onChange={(e) => setEditAnswerText(e.target.value)}
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter') handleSaveAnswer(answer.answerId)
                                            if (e.key === 'Escape') handleCancelAnswer()
                                        }}
                                        className="flex-1 p-1 text-sm rounded border border-blue-300 outline-blue-400"
                                    />
                                    {/* <input
                                        type="file"
                                        accept="image/*"
                                        id={`answer-pic-${answer.answerId}`}
                                        className="hidden"
                                        onChange={(e) => {
                                            const file = e.target.files?.[0]
                                            if (!file) return
                                            const reader = new FileReader()
                                            reader.onload = () => {
                                                const base64 = (reader.result as string).split(',')[1]
                                                savePicture({ questionAnswerId: answer.answerId, picture: base64 })
                                            }
                                            reader.readAsDataURL(file)
                                        }}
                                    />
                                    <label
                                        htmlFor={`answer-pic-${answer.answerId}`}
                                        className="p-1 rounded text-gray-300 hover:text-blue-500 hover:bg-blue-50
        opacity-0 group-hover/answer:opacity-100 transition-all cursor-pointer"
                                        title="Добавить картинку"
                                    >
                                        {isSavingPicture
                                            ? <Loader className="w-3.5 h-3.5 animate-spin" />
                                            : <ImageIcon className="w-3.5 h-3.5" />
                                        }
                                    </label> */}
                                    <button
                                        onClick={() => handleSaveAnswer(answer.answerId)}
                                        disabled={isUpdatingAnswer}
                                        className="p-1 rounded text-white bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-50"
                                    >
                                        {isUpdatingAnswer
                                            ? <Loader className="w-3.5 h-3.5 animate-spin" />
                                            : <Check className="w-3.5 h-3.5" />
                                        }
                                    </button>
                                    <button onClick={handleCancelAnswer} className="p-1 rounded text-gray-400 hover:bg-gray-200 transition-colors">
                                        <X className="w-3.5 h-3.5" />
                                    </button>
                                </>
                            ) : (
                                <>
                                    <div className={`flex items-center gap-1.5 flex-1 py-1 px-2 rounded-lg text-sm
                                        ${answer.isTrue ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}
                                    >
                                        {answer.isTrue && <CheckCircle className="w-3.5 h-3.5 shrink-0" />}
                                        <span>{answer.answerText}</span>
                                    </div>





                                    <button
                                        onClick={() => startEditAnswer(answer)}
                                        className="p-1 rounded text-gray-300 hover:text-blue-500 hover:bg-blue-50 opacity-0 group-hover/answer:opacity-100 transition-all"
                                    >
                                        <Pencil className="w-3.5 h-3.5" />
                                    </button>
                                    <button
                                        onClick={() => deleteAnswer(answer.answerId)}
                                        disabled={isDeletingAnswer && deletingAnswerId === answer.answerId}
                                        className="p-1 rounded text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover/answer:opacity-100 transition-all disabled:opacity-50"
                                    >
                                        {isDeletingAnswer && deletingAnswerId === answer.answerId
                                            ? <Loader className="w-3.5 h-3.5 animate-spin" />
                                            : <Trash2 className="w-3.5 h-3.5" />
                                        }
                                    </button>
                                </>
                            )}
                        </div>
                    ))}
                </div>

                {/* ─── Добавить ответ ─── */}
                <div className="px-8 flex items-center gap-2">
                    <button
                        onClick={() => setNewAnswerIsTrue(!newAnswerIsTrue)}
                        title="Правильный ответ"
                        className={`shrink-0 transition-colors ${newAnswerIsTrue ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}
                    >
                        <CheckCircle className="w-4 h-4" />
                    </button>
                    <input
                        type="text"
                        placeholder="Новый вариант ответа..."
                        value={newAnswerText}
                        onChange={(e) => setNewAnswerText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleCreateAnswer()}
                        className="flex-1 p-1 text-sm rounded-lg border border-gray-200 outline-blue-400"
                    />
                    <button
                        onClick={handleCreateAnswer}
                        disabled={isCreating || !newAnswerText.trim()}
                        className="p-1 rounded text-gray-300 hover:text-green-500 transition-colors disabled:opacity-30"
                    >
                        {isCreating
                            ? <Loader className="w-4 h-4 animate-spin" />
                            : <PlusCircle className="w-4 h-4" />
                        }
                    </button>
                </div>
            </div>

            <ConfirmDialog
                isOpen={showConfirm}
                title="Удалить вопрос?"
                description={`"${question.questionText}"`}
                isLoading={isDeleting}
                onConfirm={() => { onDelete(question.questionId); setShowConfirm(false) }}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    )
}   