'use client'

import { PlusCircle, Trash2 } from "lucide-react"
import { GroupFormWrapper } from "@/shared/ui/group-form-wrapper"
import { useKnowledgeGroup } from "../model/useKnowledgeGroup"

export const KnowledgeGroupForm = () => {
    const {
        form, isValid, isPending, saveAll,
        setGroupName,
        addKnowledge, removeKnowledge, updateKnowledge,
        addLevel, removeLevel, updateLevel,
    } = useKnowledgeGroup()

    return (
        <GroupFormWrapper
            title="Группа знаний"
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
                    value={form.knowledgeGroupName}
                    onChange={(e) => setGroupName(e.target.value)}
                    className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                    placeholder="Например: Программирование"
                />
            </div>

            {/* Знания */}
            <div className="space-y-3">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Знания</p>

                {form.knowledge.map((knowledge, kIndex) => (
                    <div key={kIndex} className="border border-gray-200 rounded-lg p-3 space-y-2">

                        {/* Тема знания */}
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-gray-400 shrink-0">#{kIndex + 1}</span>
                            <input
                                type="text"
                                value={knowledge.knowledgeText}
                                onChange={(e) => updateKnowledge(kIndex, e.target.value)}
                                className="flex-1 p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                placeholder="Тема знания"
                            />
                            <button
                                onClick={() => removeKnowledge(kIndex)}
                                className="p-1 text-gray-300 hover:text-red-400 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        {/* Уровни */}
                        <div className="ml-6 space-y-1.5">
                            <p className="text-xs text-gray-400">Уровни знания</p>
                            {knowledge.knowledgeLevels.map((level, lIndex) => (
                                <div key={lIndex} className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        value={level.knowledgeLevelText}
                                        onChange={(e) => updateLevel(kIndex, lIndex, e.target.value)}
                                        className="flex-1 p-1 text-sm rounded-lg border border-gray-200 outline-blue-400"
                                        placeholder={`Уровень ${lIndex + 1}`}
                                    />
                                    <button
                                        onClick={() => removeLevel(kIndex, lIndex)}
                                        disabled={knowledge.knowledgeLevels.length <= 1}
                                        className="p-1 text-gray-300 hover:text-red-400 transition-colors disabled:opacity-30"
                                    >
                                        <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addLevel(kIndex)}
                                className="text-xs text-blue-400 hover:text-blue-600 flex items-center gap-1 mt-1"
                            >
                                <PlusCircle className="w-3 h-3" /> добавить уровень
                            </button>
                        </div>
                    </div>
                ))}

                <button
                    onClick={addKnowledge}
                    className="w-full py-1.5 border border-dashed border-gray-300 rounded-lg text-sm text-gray-400
                        hover:border-blue-400 hover:text-blue-500 flex items-center justify-center gap-1 transition-colors"
                >
                    <PlusCircle className="w-4 h-4" /> добавить знание
                </button>
            </div>
        </GroupFormWrapper>
    )
}