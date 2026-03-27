'use client'

import { Loader } from "lucide-react"

import { useEcosystem } from "@/widgets/admin-ecosystem"
import { useCategory } from "@/widgets/admin-category"
import { useQuestionsGroup } from "@/widgets/admin-questions/model/useQuestionsGroup"
import { useKnowledgeGroup } from "@/widgets/admin-knowledge/model/useKnowledgeGroup"
import { useAdditionalGroup } from "@/widgets/admin-additional/model/useAdditionalGroup"
import { useAdminFilters } from "@/widgets/admin-filters"
import { usePicture } from "@/widgets/admin-picture/model/usePicture"
import { useVacancyEdit } from "../model/useVacancyEdit"

import { VacancySelectCard } from "./VacancySelectCard"
import { VacancyGroupSelect } from "./VacancyGroupSelect"
import { VacancyPictureSelect } from "./VacancyPictureSelect"
import { FilterChoice } from "./FilterChoice"
import { ToggleButton } from "@/shared/ui/toggle-button"
import { BackButton } from "@/shared/ui/back-button"

export const VacancyEdit = ({ vacancyId }: { vacancyId: number }) => {
    const { form, setField, isValid, updateVacancy, isUpdating, vacancy } = useVacancyEdit(vacancyId)



    const { ecosystems } = useEcosystem()
    const { category } = useCategory()
    const { items } = useQuestionsGroup()
    const { groups } = useKnowledgeGroup()
    const { additionalGroups } = useAdditionalGroup()
    const { pictures } = usePicture()

    const { items: workScheduleItems } = useAdminFilters('workSchedule')
    const { items: salaryItems } = useAdminFilters('salary')
    const { items: experienceItems } = useAdminFilters('experience')
    const { items: educationItems } = useAdminFilters('education')
    const { items: specializationItems } = useAdminFilters('specialization')
    const { items: regionItems } = useAdminFilters('region')
    const { items: advantageItems } = useAdminFilters('advantage')

    if (!form) return (
        <div className="flex justify-center py-10">
            <Loader className="w-6 h-6 animate-spin text-gray-400" />
        </div>
    )

    return (
        <div className="space-y-5">
            <div className="flex items-center justify-between relative">
                <BackButton />
                <h1 className="font-bold text-gray-700">{vacancy?.vacancyName}</h1>
                <button
                    onClick={() => updateVacancy()}
                    disabled={!isValid || isUpdating}
                    className="sticky top-0 py-2 px-6 bg-green-400/70 backdrop-blur-md border border-white/50 rounded-lg text-sm
                        hover:bg-green-500/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                    {isUpdating ? <><Loader className="w-4 h-4 animate-spin" />Сохранение...</> : 'Сохранить'}
                </button>
            </div>

            <div className="grid grid-cols-1 gap-5">
                <div className="space-y-4">

                    {/* Название */}
                    <div className="space-y-1.5">
                        <p className="font-semibold text-sm">Название вакансии</p>
                        <input
                            type="text"
                            value={form.vacancyName}
                            onChange={(e) => setField('vacancyName', e.target.value)}
                            className="bg-white/40 backdrop-blur-md border border-white/50 rounded-md w-full p-2 text-sm outline-blue-400"
                        />
                    </div>

                    {/* Тогглы + картинка */}
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <VacancyPictureSelect
                            pictures={pictures}
                            selectedId={form.vacancyPicturesId ?? 0}  // ← ?? 0 для отображения
                            onSelect={(id) => setField('vacancyPicturesId', id === 0 ? null : id)}
                        />
                          <ToggleButton
                            label="Опубликовать"
                            value={form.isActive}
                            onChange={(v) => setField('isActive', v)}
                        />
                        <ToggleButton
                            label="Резюме"
                            value={form.cvIsActive}
                            onChange={(v) => setField('cvIsActive', v)}
                        />
                        </div>
                        <div className="col-span-1">
                    {form.vacancyPicturesId !== null && (() => {
                        const pic = pictures.find(p => p.pictureId === form.vacancyPicturesId)
                        return pic ? (
                            <div className="rounded-xl overflow-hidden border border-white/50 bg-white/30 backdrop-blur-md h-48">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${pic.pictureName}`}
                                    alt={pic.pictureDescription}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ) : null
                    })()}
                </div>
                      
                    </div>

                    {/* Экосистема */}
                    <VacancySelectCard
                        title="Выберите экосистему"
                        items={ecosystems.map(e => ({
                            id: e.ecosystemId,
                            name: e.ecosystemName,
                            description: e.ecosystemDescription,
                            picture: e.ecosystemPicture,
                        }))}
                        selectedId={form.ecosystemId ?? 0}
                        onSelect={(id) => setField('ecosystemId', id === 0 ? null : id)}
                    />

                    {/* Категория */}
                    <VacancySelectCard
                        title="Выберите категорию"
                        items={category.map(c => ({
                            id: c.vacancyCategoryId,
                            name: c.vacancyCategoryName,
                            description: c.vacancyCategoryDescription,
                            picture: c.vacancyCategoryPicture,
                        }))}
                        selectedId={form.vacancyCategoryId ?? 0}
                        onSelect={(id) => setField('vacancyCategoryId', id === 0 ? null : id)}
                    />

                    {/* Фильтры */}
                    <div className="grid grid-cols-2 gap-3">
                        <FilterChoice title="График работы" name="workSchedule"
                            selectedId={form.workScheduleId ?? 0}
                            onSelect={(id) => setField('workScheduleId', id === 0 ? null : id)} />
                        <FilterChoice title="Опыт работы" name="experience"
                            selectedId={form.experienceId ?? 0}
                            onSelect={(id) => setField('experienceId', id === 0 ? null : id)} />
                        <FilterChoice title="Зарплата" name="salary"
                            selectedId={form.salaryId ?? 0}
                            onSelect={(id) => setField('salaryId', id === 0 ? null : id)} />
                        <FilterChoice title="Образование" name="education"
                            selectedId={form.educationId ?? 0}
                            onSelect={(id) => setField('educationId', id === 0 ? null : id)} />
                        <FilterChoice title="Специализация" name="specialization"
                            selectedId={form.specializationId ?? 0}
                            onSelect={(id) => setField('specializationId', id === 0 ? null : id)} />
                        <FilterChoice title="Регион" name="region"
                            selectedId={form.regionId ?? 0}
                            onSelect={(id) => setField('regionId', id === 0 ? null : id)} />
                        <FilterChoice title="Прочее" name="advantage"
                            selectedId={form.advantageId ?? 0}
                            onSelect={(id) => setField('advantageId', id === 0 ? null : id)} />
                    </div>

                    {/* Группы */}
                    <VacancyGroupSelect
                        title="Выберите тест"
                        items={items.map(i => ({ id: i.questionGroupId, name: i.questionGroupName }))}
                        selectedId={form.questionGroupId ?? 0}
                        onSelect={(id) => setField('questionGroupId', id === 0 ? null : id)}
                    />
                    <VacancyGroupSelect
                        title="Выберите тест на общие знания"
                        items={groups.map(g => ({ id: g.knowledgeGroupId, name: g.knowledgeGroupName }))}
                        selectedId={form.knowledgeGroupId ?? 0}
                        onSelect={(id) => setField('knowledgeGroupId', id === 0 ? null : id)}
                    />
                    <VacancyGroupSelect
                        title="Выберите дополнительные вопросы"
                        items={additionalGroups.map(a => ({ id: a.additionalQuestionGroupId, name: a.additionalQuestionGroupName }))}
                        selectedId={form.additionalQuestionGroupId ?? 0}
                        onSelect={(id) => setField('additionalQuestionGroupId', id === 0 ? null : id)}
                    />
                </div>

                {/* Превью картинки */}
                {/* <div>
                    {form.vacancyPicturesId !== null && (() => {
                        const pic = pictures.find(p => p.pictureId === form.vacancyPicturesId)
                        return pic ? (
                            <div className="sticky top-0 rounded-xl overflow-hidden border border-white/50 bg-white/30 backdrop-blur-md h-48">
                                <img
                                    src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}/${pic.pictureName}`}
                                    alt={pic.pictureDescription}
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        ) : null
                    })()}
                </div> */}
            </div>
        </div>
    )
}