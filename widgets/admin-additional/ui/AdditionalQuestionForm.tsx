'use client'
 
import { useState } from "react"
import { PlusCircle, Trash2 } from "lucide-react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { GroupFormWrapper } from "@/shared/group-form-wrapper" 
import { useSnackbar } from "@/shared/admin-snackbar"
import { api } from "@/shared/api/axiosInctance"
 
type QuestionType = 'TEST' | 'ESSAY'
 
interface AdditionalQuestionDto {
    questionType: QuestionType
    numbering: number
    additionalQuestion: string
    milliseconds: number
    essayLength: number
}
 
interface AdditionalGroupFormData {
    additionalQuestionGroupName: string
    additionalQuestionDtoList: AdditionalQuestionDto[]
}
 
const emptyQuestion = (numbering: number): AdditionalQuestionDto => ({
    questionType: 'TEST',
    numbering,
    additionalQuestion: '',
    milliseconds: 30000,
    essayLength: 0,
})
 
export const AdditionalQuestionForm = () => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()
 
    const [form, setForm] = useState<AdditionalGroupFormData>({
        additionalQuestionGroupName: '',
        additionalQuestionDtoList: [emptyQuestion(1)],
    })
 
    const isValid = !!form.additionalQuestionGroupName.trim() &&
        form.additionalQuestionDtoList.every(q => q.additionalQuestion.trim())
 
    const { mutate, isPending } = useMutation({
        mutationFn: () => api.post('vacancy/additional/addAllAdditionalGroupQuestion', [form]),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['additional-question-groups'] })
            success('Группа дополнительных вопросов сохранена')
            setForm({ additionalQuestionGroupName: '', additionalQuestionDtoList: [emptyQuestion(1)] })
        },
        onError: () => error('Ошибка при сохранении'),
    })
 
    const addQuestion = () => {
        setForm(prev => ({
            ...prev,
            additionalQuestionDtoList: [
                ...prev.additionalQuestionDtoList,
                emptyQuestion(prev.additionalQuestionDtoList.length + 1),
            ],
        }))
    }
 
    const removeQuestion = (index: number) => {
        setForm(prev => ({
            ...prev,
            additionalQuestionDtoList: prev.additionalQuestionDtoList.filter((_, i) => i !== index),
        }))
    }
 
    const updateQuestion = (index: number, field: keyof AdditionalQuestionDto, value: unknown) => {
        setForm(prev => ({
            ...prev,
            additionalQuestionDtoList: prev.additionalQuestionDtoList.map((q, i) =>
                i === index ? { ...q, [field]: value } : q
            ),
        }))
    }
 
    return (
        <GroupFormWrapper
            title="Группа дополнительных вопросов"
            onSubmit={() => mutate()}
            isLoading={isPending}
            isValid={isValid}
            submitLabel="Сохранить группу"
        >
            {/* Название группы */}
            <div>
                <label className="text-xs text-gray-500 mb-1 block">Название группы</label>
                <input
                    type="text"
                    value={form.additionalQuestionGroupName}
                    onChange={(e) => setForm(prev => ({ ...prev, additionalQuestionGroupName: e.target.value }))}
                    className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                    placeholder="Например: HR вопросы"
                />
            </div>
 
            {/* Вопросы */}
            <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Вопросы</p>
 
                {form.additionalQuestionDtoList.map((question, index) => (
                    <div key={index} className="border border-gray-200 rounded-lg p-3 space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 shrink-0">#{index + 1}</span>
                            <input
                                type="text"
                                value={question.additionalQuestion}
                                onChange={(e) => updateQuestion(index, 'additionalQuestion', e.target.value)}
                                className="flex-1 p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                placeholder="Текст вопроса"
                            />
                            <button
                                onClick={() => removeQuestion(index)}
                                className="p-1 text-gray-300 hover:text-red-400 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
 
                        <div className="grid grid-cols-3 gap-2">
                            {/* Тип вопроса */}
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Тип</label>
                                <select
                                    value={question.questionType}
                                    onChange={(e) => updateQuestion(index, 'questionType', e.target.value as QuestionType)}
                                    className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400 bg-white"
                                >
                                    <option value="TEST">TEST</option>
                                    <option value="ESSAY">ESSAY</option>
                                </select>
                            </div>
 
                            {/* Миллисекунды */}
                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Время (мс)</label>
                                <input
                                    type="number"
                                    value={question.milliseconds}
                                    onChange={(e) => updateQuestion(index, 'milliseconds', Number(e.target.value))}
                                    className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                />
                            </div>
 
                            {/* Длина эссе — только для ESSAY */}
                            {question.questionType === 'ESSAY' && (
                                <div>
                                    <label className="text-xs text-gray-500 mb-1 block">Длина эссе</label>
                                    <input
                                        type="number"
                                        value={question.essayLength}
                                        onChange={(e) => updateQuestion(index, 'essayLength', Number(e.target.value))}
                                        className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                    />
                                </div>
                            )}
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