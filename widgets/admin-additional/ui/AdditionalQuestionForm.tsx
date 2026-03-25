'use client'

import { PlusCircle, Trash2 } from "lucide-react"
import { GroupFormWrapper } from "@/shared/ui/group-form-wrapper"
import { useAdditionalGroup } from "../model/useAdditionalGroup"
import { AdditionalQuestionDto } from "@/entities/vacancy-tests/api/additional"

type QuestionType = 'TEST' | 'ESSAY'

export const AdditionalQuestionForm = () => {
    const {
        form, isValid, isPending, saveAll,
        setGroupName, addQuestion, removeQuestion, updateQuestion,
    } = useAdditionalGroup()

    return (
        <GroupFormWrapper
            title="Группа дополнительных вопросов"
            onSubmit={() => saveAll()}
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
                    onChange={(e) => setGroupName(e.target.value)}
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

                            <div>
                                <label className="text-xs text-gray-500 mb-1 block">Время (мс)</label>
                                <input
                                    type="number"
                                    value={question.milliseconds}
                                    onChange={(e) => updateQuestion(index, 'milliseconds', Number(e.target.value))}
                                    className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                />
                            </div>

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