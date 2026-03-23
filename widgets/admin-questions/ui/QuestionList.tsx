'use client'

import { useState } from "react"
import { Loader, PlusCircle, Trash2, CheckCircle } from "lucide-react"
import { useQuestionList } from "../model/useQuestionList"
import { QuestionItem } from "./QuestionItem"
import { AnswerDto } from "@/entities/vacancy-tests/model/types"

const defaultAnswers = (): AnswerDto[] => [
    { answerText: '', isTrue: false },
    { answerText: '', isTrue: false },
]

export const QuestionList = ({ questionGroupId }: { questionGroupId: number }) => {
    const {
        questions, groupInfo, isLoading, isCreating, isUpdating,
        isDeleting, deletingId,
        createQuestion, updateQuestion, deleteQuestion,
    } = useQuestionList(questionGroupId)

    const [questionText, setQuestionText] = useState('')
    const [milliseconds, setMilliseconds] = useState<number | ''>('')
    const [answers, setAnswers] = useState<AnswerDto[]>(defaultAnswers())

    const addAnswer = () =>
        setAnswers(prev => [...prev, { answerText: '', isTrue: false }])

    const removeAnswer = (index: number) => {
        if (answers.length <= 2) return
        setAnswers(prev => prev.filter((_, i) => i !== index))
    }

    const updateAnswer = (index: number, field: keyof AnswerDto, value: string | boolean) =>
        setAnswers(prev => prev.map((a, i) => i === index ? { ...a, [field]: value } : a))

    const handleCreate = () => {
        if (!questionText.trim() || !milliseconds) return
        if (answers.some(a => !a.answerText.trim())) return

        createQuestion(
            {
                questionText: questionText.trim(),
                milliseconds: Number(milliseconds),
                answers,
            },
            {
                onSuccess: () => {
                    setQuestionText('')
                    setMilliseconds('')
                    setAnswers(defaultAnswers())
                },
            }
        )
    }

    const isFormValid =
        !!questionText.trim() &&
        !!milliseconds &&
        answers.every(a => !!a.answerText.trim())

    if (isLoading) return <Loader className="w-5 h-5 animate-spin text-gray-400" />

    return (
        <div className="space-y-3">

            {/* Форма создания вопроса */}
            <div className="border border-gray-200 rounded-lg p-3 space-y-3 bg-gray-50">

                {/* Текст вопроса + мс */}
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        placeholder="Текст вопроса..."
                        value={questionText}
                        onChange={(e) => setQuestionText(e.target.value)}
                        className="flex-1 p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                    />
                    <input
                        type="number"
                        placeholder="мс"
                        value={milliseconds}
                        onChange={(e) => setMilliseconds(e.target.value ? Number(e.target.value) : '')}
                        className="w-24 p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                    />
                </div>

                {/* Варианты ответов */}
                <div className="space-y-2">
                    {answers.map((answer, index) => (
                        <div key={index} className="flex items-center gap-2">
                            <button
                                onClick={() => updateAnswer(index, 'isTrue', !answer.isTrue)}
                                title="Правильный ответ"
                                className={`shrink-0 transition-colors ${answer.isTrue ? 'text-green-500' : 'text-gray-300 hover:text-gray-400'}`}
                            >
                                <CheckCircle className="w-5 h-5" />
                            </button>

                            <input
                                type="text"
                                placeholder={`Вариант ответа ${index + 1}...`}
                                value={answer.answerText}
                                onChange={(e) => updateAnswer(index, 'answerText', e.target.value)}
                                className="flex-1 p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                            />

                            <button
                                onClick={() => removeAnswer(index)}
                                disabled={answers.length <= 2}
                                className="shrink-0 text-gray-300 hover:text-red-400 transition-colors disabled:opacity-30"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* Нижняя строка */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={addAnswer}
                        className="flex items-center gap-1 text-sm text-gray-400 hover:text-blue-500 transition-colors"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Добавить вариант
                    </button>

                    <button
                        onClick={handleCreate}
                        disabled={isCreating || !isFormValid}
                        className="py-1.5 px-4 bg-gray-400 rounded-lg flex items-center gap-2 text-white
                            hover:bg-green-500 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isCreating
                            ? <Loader className="w-4 h-4 animate-spin" />
                            : <><p className="text-sm">Добавить вопрос</p><PlusCircle className="w-4 h-4" /></>
                        }
                    </button>
                </div>
            </div>


            {/* Список вопросов */}
            <div className="divide-y divide-gray-100">
                {questions.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">Вопросов пока нет</p>
                )}
                {questions.map((question) => (
                    <QuestionItem
                        key={question.questionId}
                        question={question}
                        questionGroupId={questionGroupId}
                        isDeleting={isDeleting && deletingId === question.questionId}
                        isUpdating={isUpdating}
                        onUpdate={updateQuestion}
                        onDelete={deleteQuestion}
                    />
                ))}
            </div>
        </div>
    )
}