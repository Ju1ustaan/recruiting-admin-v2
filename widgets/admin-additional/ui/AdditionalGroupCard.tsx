'use client'

import { useState } from "react"
import { Loader, PlusCircle, Clock, FileText, Video, Check, X, Pencil, Trash2, ChevronRight } from "lucide-react"
import { AdditionalGroupShort, UpdateAdditionalQuestionDto, QuestionType } from "@/entities/vacancy-tests/api/additional"
import { ConfirmDialog } from "@/shared/confirm-dialog"
import { useAdditionalList } from "../model/useAdditionalList"

const TYPE_LABELS = {
    ESSAY: { label: 'Эссе', icon: FileText, color: 'bg-purple-100 text-purple-600' },
    TEST: { label: 'Тест', icon: Video, color: 'bg-blue-100 text-blue-600' },
}

export const AdditionalGroupCard = ({ group }: { group: AdditionalGroupShort }) => {
    const {
        questions, isLoading,
        updateGroup, deleteGroup, isDeletingGroup,
        createQuestion, isCreating,
        updateQuestion, isUpdatingQuestion,
        deleteQuestion, deletingQuestionId, isDeletingQuestion,
    } = useAdditionalList(group.additionalQuestionGroupId)

    const [isOpen, setIsOpen] = useState(false)
    const [showGroupConfirm, setShowGroupConfirm] = useState(false)

    // ─── Редактирование заголовка группы ─────────────
    const [isEditingGroup, setIsEditingGroup] = useState(false)
    const [groupName, setGroupName] = useState(group.additionalQuestionGroupName)

    // ─── Форма нового вопроса ─────────────────────────
    const [newQuestion, setNewQuestion] = useState({
        questionType: 'TEST' as QuestionType,
        additionalQuestion: '',
        milliseconds: 30000,
        essayLength: 0,
        numbering: questions.length + 1,
    })

    // ─── Редактирование вопроса ───────────────────────
    const [editingQuestionId, setEditingQuestionId] = useState<number | null>(null)
    const [editQuestion, setEditQuestion] = useState<Omit<UpdateAdditionalQuestionDto, 'additionalQuestionId' | 'additionalQuestionGroupId'>>({
        questionType: 'TEST',
        numbering: 0,
        additionalQuestion: '',
        milliseconds: 30000,
        essayLength: 0,
    })

    const [confirmQuestionId, setConfirmQuestionId] = useState<number | null>(null)

    const handleCreateQuestion = () => {
        if (!newQuestion.additionalQuestion.trim()) return
        createQuestion(newQuestion, {
            onSuccess: () => setNewQuestion({ questionType: 'TEST', additionalQuestion: '', milliseconds: 30000, essayLength: 0, numbering: questions.length + 2 }),
        })
    }

    const startEditQuestion = (q: typeof questions[0]) => {
        setEditingQuestionId(q.additionalQuestionId)
        setEditQuestion({
            questionType: q.questionType,
            numbering: q.numbering,
            additionalQuestion: q.additionalQuestion,
            milliseconds: q.milliseconds,
            essayLength: q.essayLength,
        })
    }

    const handleSaveQuestion = (additionalQuestionId: number) => {
        updateQuestion(
            { additionalQuestionId, additionalQuestionGroupId: group.additionalQuestionGroupId, ...editQuestion },
            { onSuccess: () => setEditingQuestionId(null) }
        )
    }

    return (
        <>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">

                {/* ─── Заголовок группы ─── */}
                <div className="flex items-center justify-between bg-blue-100 p-3 rounded-t-lg">
                    <div className="flex items-center gap-2 flex-1">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
                        </button>

                        {isEditingGroup ? (
                            <>
                                <input
                                    autoFocus
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                    className="flex-1 p-1 text-sm rounded border border-blue-300 outline-blue-400"
                                />
                                <button onClick={() => { updateGroup(groupName); setIsEditingGroup(false) }} className="p-1 rounded text-white bg-green-500 hover:bg-green-600">
                                    <Check className="w-3.5 h-3.5" />
                                </button>
                                <button onClick={() => { setGroupName(group.additionalQuestionGroupName); setIsEditingGroup(false) }} className="p-1 rounded text-gray-400 hover:bg-gray-200">
                                    <X className="w-3.5 h-3.5" />
                                </button>
                            </>
                        ) : (
                            <>
                                <span className="font-bold capitalize text-sm">{group.additionalQuestionGroupName}</span>
                                <button onClick={() => setIsEditingGroup(true)} className="p-1 rounded text-gray-300 hover:text-blue-500 hover:bg-blue-100 transition-colors">
                                    <Pencil className="w-3.5 h-3.5" />
                                </button>
                            </>
                        )}
                    </div>

                    <button
                        onClick={() => setShowGroupConfirm(true)}
                        disabled={isDeletingGroup}
                        className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-500 rounded-lg border border-red-200
                            hover:bg-red-500 hover:text-white hover:border-transparent transition-all disabled:opacity-50"
                    >
                        {isDeletingGroup ? <Loader className="w-4 h-4 animate-spin" /> : <><Trash2 className="w-4 h-4" />Удалить</>}
                    </button>
                </div>

                {/* ─── Список вопросов ─── */}
                {isOpen && (
                    <div className="border-t border-gray-100">
                        {isLoading ? (
                            <div className="flex justify-center py-4">
                                <Loader className="w-5 h-5 animate-spin text-gray-400" />
                            </div>
                        ) : (
                            <div className="divide-y divide-gray-50">
                                {questions.length === 0 && (
                                    <p className="text-sm text-gray-400 text-center py-4">Вопросов пока нет</p>
                                )}

                                {questions.map((question) => {
                                    const typeInfo = TYPE_LABELS[question.questionType]
                                    const Icon = typeInfo.icon
                                    const isEditing = editingQuestionId === question.additionalQuestionId

                                    return (
                                        <div key={question.additionalQuestionId} className="px-5 py-3 group hover:bg-gray-50 transition-colors">
                                            {isEditing ? (
                                                <div className="space-y-2">
                                                    <input
                                                        autoFocus
                                                        value={editQuestion.additionalQuestion}
                                                        onChange={(e) => setEditQuestion(prev => ({ ...prev, additionalQuestion: e.target.value }))}
                                                        className="w-full p-1.5 text-sm rounded border border-blue-300 outline-blue-400"
                                                    />
                                                    <div className="flex items-center gap-2">
                                                        <select
                                                            value={editQuestion.questionType}
                                                            onChange={(e) => setEditQuestion(prev => ({ ...prev, questionType: e.target.value as QuestionType }))}
                                                            className="p-1 text-sm rounded border border-gray-300 bg-white outline-blue-400"
                                                        >
                                                            <option value="TEST">TEST</option>
                                                            <option value="ESSAY">ESSAY</option>
                                                        </select>
                                                        <input
                                                            type="number"
                                                            value={editQuestion.milliseconds}
                                                            onChange={(e) => setEditQuestion(prev => ({ ...prev, milliseconds: Number(e.target.value) }))}
                                                            className="w-24 p-1 text-sm rounded border border-gray-300 outline-blue-400"
                                                            placeholder="мс"
                                                        />
                                                        {editQuestion.questionType === 'ESSAY' && (
                                                            <input
                                                                type="number"
                                                                value={editQuestion.essayLength}
                                                                onChange={(e) => setEditQuestion(prev => ({ ...prev, essayLength: Number(e.target.value) }))}
                                                                className="w-24 p-1 text-sm rounded border border-gray-300 outline-blue-400"
                                                                placeholder="длина"
                                                            />
                                                        )}
                                                        <button onClick={() => handleSaveQuestion(question.additionalQuestionId)} disabled={isUpdatingQuestion} className="p-1 rounded text-white bg-green-500 hover:bg-green-600 disabled:opacity-50">
                                                            {isUpdatingQuestion ? <Loader className="w-3.5 h-3.5 animate-spin" /> : <Check className="w-3.5 h-3.5" />}
                                                        </button>
                                                        <button onClick={() => setEditingQuestionId(null)} className="p-1 rounded text-gray-400 hover:bg-gray-200">
                                                            <X className="w-3.5 h-3.5" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-3">
                                                    <span className="text-xs text-gray-400 w-4 shrink-0">{question.numbering}.</span>
                                                    <p className="flex-1 text-sm text-gray-700">{question.additionalQuestion}</p>
                                                    <div className="flex items-center gap-2 shrink-0">
                                                        <span className={`flex items-center gap-1 text-xs px-2 py-0.5 rounded-full ${typeInfo.color}`}>
                                                            <Icon className="w-3 h-3" />{typeInfo.label}
                                                        </span>
                                                        <span className="flex items-center gap-1 text-xs text-gray-400">
                                                            <Clock className="w-3 h-3" />{question.milliseconds / 1000}с
                                                        </span>
                                                        {question.questionType === 'ESSAY' && question.essayLength > 0 && (
                                                            <span className="text-xs text-gray-400">{question.essayLength} симв.</span>
                                                        )}
                                                        <button onClick={() => startEditQuestion(question)} className="p-1 rounded text-gray-300 hover:text-blue-500 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all">
                                                            <Pencil className="w-3.5 h-3.5" />
                                                        </button>
                                                        <button
                                                            onClick={() => setConfirmQuestionId(question.additionalQuestionId)}
                                                            disabled={isDeletingQuestion && deletingQuestionId === question.additionalQuestionId}
                                                            className="p-1 rounded text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                                                        >
                                                            {isDeletingQuestion && deletingQuestionId === question.additionalQuestionId
                                                                ? <Loader className="w-3.5 h-3.5 animate-spin" />
                                                                : <Trash2 className="w-3.5 h-3.5" />
                                                            }
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    )
                                })}

                                {/* ─── Форма добавления вопроса ─── */}
                                <div className="px-5 py-3 space-y-2 bg-gray-50">
                                    <input
                                        type="text"
                                        placeholder="Текст вопроса..."
                                        value={newQuestion.additionalQuestion}
                                        onChange={(e) => setNewQuestion(prev => ({ ...prev, additionalQuestion: e.target.value }))}
                                        onKeyDown={(e) => e.key === 'Enter' && handleCreateQuestion()}
                                        className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                    />
                                    <div className="flex items-center gap-2">
                                        <select
                                            value={newQuestion.questionType}
                                            onChange={(e) => setNewQuestion(prev => ({ ...prev, questionType: e.target.value as QuestionType }))}
                                            className="p-1.5 text-sm rounded-lg border border-gray-300 bg-white outline-blue-400"
                                        >
                                            <option value="TEST">TEST</option>
                                            <option value="ESSAY">ESSAY</option>
                                        </select>
                                        <input
                                            type="number"
                                            placeholder="мс"
                                            value={newQuestion.milliseconds}
                                            onChange={(e) => setNewQuestion(prev => ({ ...prev, milliseconds: Number(e.target.value) }))}
                                            className="w-24 p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                        />
                                        {newQuestion.questionType === 'ESSAY' && (
                                            <input
                                                type="number"
                                                placeholder="длина эссе"
                                                value={newQuestion.essayLength}
                                                onChange={(e) => setNewQuestion(prev => ({ ...prev, essayLength: Number(e.target.value) }))}
                                                className="w-28 p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                            />
                                        )}
                                        <button
                                            onClick={handleCreateQuestion}
                                            disabled={isCreating || !newQuestion.additionalQuestion.trim()}
                                            className="ml-auto py-1.5 px-3 bg-gray-400 rounded-lg flex items-center gap-1.5 text-white text-sm
                                                hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isCreating ? <Loader className="w-4 h-4 animate-spin" /> : <><PlusCircle className="w-4 h-4" />Добавить</>}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* ─── Диалоги подтверждения ─── */}
            <ConfirmDialog
                isOpen={showGroupConfirm}
                title="Удалить группу?"
                description={`"${group.additionalQuestionGroupName}" и все вопросы будут удалены`}
                isLoading={isDeletingGroup}
                onConfirm={() => { deleteGroup(); setShowGroupConfirm(false) }}
                onCancel={() => setShowGroupConfirm(false)}
            />

            <ConfirmDialog
                isOpen={confirmQuestionId !== null}
                title="Удалить вопрос?"
                isLoading={isDeletingQuestion}
                onConfirm={() => { if (confirmQuestionId) deleteQuestion(confirmQuestionId); setConfirmQuestionId(null) }}
                onCancel={() => setConfirmQuestionId(null)}
            />
        </>
    )
}