'use client'

import { X, Loader } from "lucide-react"
import { VacancyFormDto } from "../model/useVacancyForm"

interface PreviewItem {
    label: string
    value: string | null
    onClear: () => void
}

interface VacancyPreviewProps {
    form: VacancyFormDto
    isValid: boolean
    onSave: () => void
    onClearField: <K extends keyof VacancyFormDto>(key: K, defaultValue: VacancyFormDto[K]) => void
    // для отображения имён вместо id
    ecosystemName?: string
    categoryName?: string
    workScheduleName?: string
    salaryName?: string
    experienceName?: string
    educationName?: string
    specializationNames?: string[]
    regionNames?: string[]
    advantageNames?: string[]
    questionGroupName?: string
    knowledgeGroupName?: string
    additionalGroupName?: string
    selectedPicture?: { pictureName: string, pictureDescription: string }
    isLoading?: boolean
}

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''
const PreviewTag = ({ label, value, onClear }: PreviewItem) => {
    if (!value) return null
    return (
        <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-lg bg-white/50 border border-white/60 text-sm">
            <div className="min-w-0">
                <p className="text-xs text-gray-400">{label}</p>
                <p className="text-gray-700 font-medium truncate">{value}</p>
            </div>
            <button onClick={onClear} className="shrink-0 text-gray-300 hover:text-red-400 transition-colors">
                <X className="w-4 h-4" />
            </button>
        </div>
    )
}

const PreviewMultiTag = ({ label, values, onClear }: { label: string, values: string[], onClear: () => void }) => {
    if (!values.length) return null
    return (
        <div className="px-3 py-2 rounded-lg bg-white/50 border border-white/60 text-sm">
            <div className="flex items-center justify-between mb-1">
                <p className="text-xs text-gray-400">{label}</p>
                <button onClick={onClear} className="text-gray-300 hover:text-red-400 transition-colors">
                    <X className="w-3.5 h-3.5" />
                </button>
            </div>
            <div className="flex flex-wrap gap-1">
                {values.map((v, i) => (
                    <span key={i} className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs">{v}</span>
                ))}
            </div>
        </div>
    )
}

export const VacancyPreview = ({
    form, isValid, onSave, onClearField,
    ecosystemName, categoryName,
    workScheduleName, salaryName, experienceName, educationName,
    specializationNames = [], regionNames = [], advantageNames = [],
    questionGroupName, knowledgeGroupName, additionalGroupName, selectedPicture, isLoading
}: VacancyPreviewProps) => {
    return (
        <div className="sticky top-0 space-y-3">
            <div className="bg-white/30 backdrop-blur-md border border-white/50 rounded-xl p-4 space-y-2">
                <p className="font-semibold text-gray-700 text-sm mb-3">Превью вакансии</p>
                {/* Тогглы */}
                <div className="flex gap-2">
                    {form.isActive !== undefined && (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-white/50 border border-white/60">
                            <div className={`w-2 h-2 rounded-full ${form.isActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <span className="text-gray-600">{form.isActive ? 'Опубликовано' : 'Не опубликовано'}</span>
                        </div>
                    )}
                    {form.cvIsActive !== undefined && (
                        <div className="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs bg-white/50 border border-white/60">
                            <div className={`w-2 h-2 rounded-full ${form.cvIsActive ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <span className="text-gray-600">{form.cvIsActive ? 'Резюме' : 'Без резюме'}</span>
                        </div>
                    )}
                </div>
                {/* Название */}
                {form.vacancyName && (
                    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-blue-500/20 border border-blue-300">
                        <p className="font-semibold text-blue-700 truncate">{form.vacancyName}</p>
                        <button onClick={() => onClearField('vacancyName', '')} className="text-blue-300 hover:text-red-400 transition-colors shrink-0">
                            <X className="w-4 h-4" />
                        </button>
                    </div>
                )}
                {selectedPicture && (
                    <div className="rounded-lg overflow-hidden border border-white/50 h-24">
                        <img
                            src={`${BASE_URL}/${selectedPicture.pictureName}`}
                            alt={selectedPicture.pictureDescription}
                            className="w-full h-full object-contain"
                        />
                    </div>
                )}



                {/* Одиночные */}
                <PreviewTag label="Экосистема" value={ecosystemName ?? null} onClear={() => onClearField('ecosystemId', 0)} />
                <PreviewTag label="Категория" value={categoryName ?? null} onClear={() => onClearField('vacancyCategoryId', 0)} />
                <PreviewTag label="График работы" value={workScheduleName ?? null} onClear={() => onClearField('workScheduleId', 0)} />
                <PreviewTag label="Зарплата" value={salaryName ?? null} onClear={() => onClearField('salaryId', 0)} />
                <PreviewTag label="Опыт работы" value={experienceName ?? null} onClear={() => onClearField('experienceId', 0)} />
                <PreviewTag label="Образование" value={educationName ?? null} onClear={() => onClearField('educationId', 0)} />
                <PreviewTag label="Тест" value={questionGroupName ?? null} onClear={() => onClearField('questionGroupId', 0)} />
                <PreviewTag label="Общие знания" value={knowledgeGroupName ?? null} onClear={() => onClearField('knowledgeGroupId', 0)} />
                <PreviewTag label="Доп. вопросы" value={additionalGroupName ?? null} onClear={() => onClearField('additionalQuestionGroupId', 0)} />

                {/* Множественные */}
                <PreviewMultiTag label="Специализация" values={specializationNames} onClear={() => onClearField('specializationId', [])} />
                <PreviewMultiTag label="Регион" values={regionNames} onClear={() => onClearField('regionId', [])} />
                <PreviewMultiTag label="Прочее" values={advantageNames} onClear={() => onClearField('advantageId', [])} />
            </div>

            {/* Кнопка сохранить */}
            <button
                onClick={onSave}
                disabled={!isValid || isLoading}
                className="w-full py-2.5 bg-green-400/70 backdrop-blur-md border border-white/50 rounded-xl text-sm font-medium
                    hover:bg-green-500/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isLoading ? <><Loader className="w-4 h-4 animate-spin" />Сохранение...</> : 'Сохранить вакансию'}
            </button>
        </div>
    )
}