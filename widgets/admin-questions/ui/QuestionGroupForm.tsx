'use client'

import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { GroupFormWrapper } from "@/shared/group-form-wrapper"
import { useQuestionsGroup } from "../model/useQuestionsGroup"
import { SaveAllQuestionDto } from "@/entities/vacancy-tests"

interface Answer {
    answerText: string
    isTrue: boolean
}

interface QuestionDto {
    questionText: string
    milliseconds: number
    numbering: number
    answers: Answer[]
}

interface FormState {
    questionGroupId: number | ''
    questionGroupName: string
    passingScore: number | ''
    questionDtos: QuestionDto[]
}

const emptyQuestion = (numbering: number): QuestionDto => ({
    questionText: '',
    milliseconds: 30000,
    numbering,
    answers: [{ answerText: '', isTrue: false }],
})

const initialForm = (): FormState => ({
    questionGroupId: '',
    questionGroupName: '',
    passingScore: '',
    questionDtos: [emptyQuestion(1)],
})

export const QuestionGroupForm = () => {
    const { saveAll, isSaving } = useQuestionsGroup()
    const [form, setForm] = useState<FormState>(initialForm())

    const isValid =
    !!form.questionGroupName.trim() &&
    form.passingScore !== '' &&
    form.questionDtos.length > 0 &&
    form.questionDtos.every(question =>
        !!question.questionText.trim() &&
        question.answers.length > 0 &&
        question.answers.every(answer => !!answer.answerText.trim())
    )

    const handleSubmit = () => {
        saveAll([form as SaveAllQuestionDto], {
            onSuccess: () => setForm(initialForm()),
        })
    }

    // ─── Вопросы ───────────────────────────────────────
    const addQuestion = () =>
        setForm(prev => ({
            ...prev,
            questionDtos: [...prev.questionDtos, emptyQuestion(prev.questionDtos.length + 1)],
        }))

    const removeQuestion = (index: number) =>
        setForm(prev => ({
            ...prev,
            questionDtos: prev.questionDtos.filter((_, i) => i !== index),
        }))

    const updateQuestion = (index: number, field: keyof QuestionDto, value: unknown) =>
        setForm(prev => ({
            ...prev,
            questionDtos: prev.questionDtos.map((q, i) => i === index ? { ...q, [field]: value } : q),
        }))

    // ─── Ответы ────────────────────────────────────────
    const addAnswer = (qIndex: number) =>
        setForm(prev => ({
            ...prev,
            questionDtos: prev.questionDtos.map((q, i) =>
                i === qIndex ? { ...q, answers: [...q.answers, { answerText: '', isTrue: false }] } : q
            ),
        }))

    const updateAnswer = (qIndex: number, aIndex: number, field: keyof Answer, value: unknown) =>
        setForm(prev => ({
            ...prev,
            questionDtos: prev.questionDtos.map((q, i) =>
                i === qIndex ? {
                    ...q,
                    answers: q.answers.map((a, j) => j === aIndex ? { ...a, [field]: value } : a),
                } : q
            ),
        }))

    return (
        <GroupFormWrapper
            title="Группа вопросов"
            onSubmit={handleSubmit}
            isLoading={isSaving}
            isValid={isValid}
            submitLabel="Сохранить группу"
        >
            {/* Название + балл */}
            <div className="grid grid-cols-2 gap-3">
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Название группы</label>
                    <input
                        type="text"
                        value={form.questionGroupName}
                        onChange={(e) => setForm(prev => ({ ...prev, questionGroupName: e.target.value }))}
                        className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                        placeholder="Название группы..."
                    />
                </div>
                <div>
                    <label className="text-xs text-gray-500 mb-1 block">Проходной балл</label>
                    <input
                        type="number"
                        min={0}
                        max={100}
                        value={form.passingScore}
                        onChange={(e) => setForm(prev => ({ ...prev, passingScore: e.target.value ? Number(e.target.value) : '' }))}
                        className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                        placeholder="0"
                    />
                </div>
            </div>

            {/* Вопросы */}
            <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Вопросы</p>

                {form.questionDtos.map((question, qIndex) => (
                    <div key={qIndex} className="border border-gray-200 rounded-lg p-3 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 shrink-0">#{qIndex + 1}</span>
                            <input
                                type="text"
                                value={question.questionText}
                                onChange={(e) => updateQuestion(qIndex, 'questionText', e.target.value)}
                                className="flex-1 p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                placeholder="Текст вопроса"
                            />
                            <input
                                type="number"
                                value={question.milliseconds}
                                onChange={(e) => updateQuestion(qIndex, 'milliseconds', Number(e.target.value))}
                                className="w-24 p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                placeholder="мс"
                            />
                            <button onClick={() => removeQuestion(qIndex)} className="p-1 text-gray-300 hover:text-red-400 transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Ответы */}
                        <div className="ml-6 space-y-1.5">
                            {question.answers.map((answer, aIndex) => (
                                <div key={aIndex} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={answer.answerText}
                                        onChange={(e) => updateAnswer(qIndex, aIndex, 'answerText', e.target.value)}
                                        className="flex-1 p-1 text-sm rounded-lg border border-gray-200 outline-blue-400"
                                        placeholder={`Вариант ${aIndex + 1}`}
                                    />
                                    <label className="flex items-center gap-1 text-xs text-gray-500 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={answer.isTrue}
                                            onChange={(e) => updateAnswer(qIndex, aIndex, 'isTrue', e.target.checked)}
                                            className="accent-green-500"
                                        />
                                        верный
                                    </label>
                                </div>
                            ))}
                            <button onClick={() => addAnswer(qIndex)} className="text-xs text-blue-400 hover:text-blue-600 flex items-center gap-1 mt-1">
                                <PlusCircle className="w-3 h-3" /> добавить ответ
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    onClick={addQuestion}
                    className="w-full py-1.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-400
                        hover:border-blue-400 hover:text-blue-500 flex items-center justify-center gap-1 transition-colors"
                >
                    <PlusCircle className="w-4 h-4" /> добавить вопрос
                </button>
            </div>
        </GroupFormWrapper>
    )
}