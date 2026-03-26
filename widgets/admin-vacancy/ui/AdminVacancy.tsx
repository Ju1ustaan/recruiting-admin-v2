'use client'

import { useEcosystem } from "@/widgets/admin-ecosystem"
import { useCategory } from "@/widgets/admin-category"
import { useQuestionsGroup } from "@/widgets/admin-questions/model/useQuestionsGroup"
import { useKnowledgeGroup } from "@/widgets/admin-knowledge/model/useKnowledgeGroup"
import { useAdditionalGroup } from "@/widgets/admin-additional/model/useAdditionalGroup"
import { useVacancyForm } from "../model/useVacancyForm"
import { useAdminFilters } from "@/widgets/admin-filters"
import { usePicture } from "@/widgets/admin-picture/model/usePicture"

import { VacancySelectCard } from "./VacancySelectCard"
import { VacancyPreview } from "./VacancyPreview"
import { VacancyPictureSelect } from "./VacancyPictureSelect"
import { VacancyGroupSelect } from "./VacancyGroupSelect"
import { ToggleButton } from "@/shared/ui/toggle-button"
import { FilterChoice } from "./FilterChoice"



export const AdminVacancy = () => {
    const { ecosystems } = useEcosystem()
    const { category } = useCategory()
    const { items } = useQuestionsGroup()
    const { groups } = useKnowledgeGroup()
    const { additionalGroups } = useAdditionalGroup()
    const { pictures } = usePicture()
    const { form, setField, toggleArrayField, clearField, isValid, createVacancy, isCreating } = useVacancyForm()

    const { items: workScheduleItems } = useAdminFilters('workSchedule')
    const { items: salaryItems } = useAdminFilters('salary')
    const { items: experienceItems } = useAdminFilters('experience')
    const { items: educationItems } = useAdminFilters('education')
    const { items: specializationItems } = useAdminFilters('specialization')
    const { items: regionItems } = useAdminFilters('region')
    const { items: advantageItems } = useAdminFilters('advantage')
    // хелперы для имён
    const findName = (items: { id: number, name: string }[], id: number) =>
        items.find(i => i.id === id)?.name

    const findNames = (items: { id: number, name: string }[], ids: number[]) =>
        items.filter(i => ids.includes(i.id)).map(i => i.name)

    return (
        <div className="grid grid-cols-2 gap-5">
            <div className="space-y-4">

                {/* Название */}
                <div className="space-y-1.5">
                    <p className="font-semibold text-sm">Название вакансии</p>
                    <input
                        type="text"
                        placeholder="Название вакансии..."
                        value={form.vacancyName}
                        onChange={(e) => setField('vacancyName', e.target.value)}
                        className="bg-white/40 backdrop-blur-md border border-white/50 rounded-md w-full p-2 text-sm outline-blue-400"
                    />
                </div>

                {/* Тогглы */}
                <div className="grid grid-cols-3 gap-3">
                    <VacancyPictureSelect
                        pictures={pictures}
                        selectedId={form.vacancyPicturesId}
                        onSelect={(id) => setField('vacancyPicturesId', id)}
                    />
                    <ToggleButton label="Опубликовать" value={form.isActive} onChange={(v) => setField('isActive', v)} />
                    <ToggleButton label="Загрузить резюме" value={form.cvIsActive} onChange={(v) => setField('cvIsActive', v)} />
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
                    selectedId={form.ecosystemId}
                    onSelect={(id) => setField('ecosystemId', id)}
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
                    selectedId={form.vacancyCategoryId}
                    onSelect={(id) => setField('vacancyCategoryId', id)}
                />

                {/* Фильтры */}
                <div className="grid grid-cols-2 gap-3">
                    {/* Один элемент */}
                    <FilterChoice title="График работы" name="workSchedule"
                        selectedId={form.workScheduleId} onSelect={(id) => setField('workScheduleId', id)} />
                    <FilterChoice title="Опыт работы" name="experience"
                        selectedId={form.experienceId} onSelect={(id) => setField('experienceId', id)} />
                    <FilterChoice title="Зарплата" name="salary"
                        selectedId={form.salaryId} onSelect={(id) => setField('salaryId', id)} />
                    <FilterChoice title="Образование" name="education"
                        selectedId={form.educationId} onSelect={(id) => setField('educationId', id)} />

                    {/* Несколько элементов */}
                    <FilterChoice title="Специализация" name="specialization"
                        selectedIds={form.specializationId} onToggle={(id) => toggleArrayField('specializationId', id)} multiple />
                    <FilterChoice title="Регион" name="region"
                        selectedIds={form.regionId} onToggle={(id) => toggleArrayField('regionId', id)} multiple />
                    <FilterChoice title="Прочее" name="advantage"
                        selectedIds={form.advantageId} onToggle={(id) => toggleArrayField('advantageId', id)} multiple />
                </div>

                {/* Группы */}
                <VacancyGroupSelect
                    title="Выберите тест"
                    items={items.map(i => ({ id: i.questionGroupId, name: i.questionGroupName }))}
                    selectedId={form.questionGroupId}
                    onSelect={(id) => setField('questionGroupId', id)}
                />
                <VacancyGroupSelect
                    title="Выберите тест на общие знания"
                    items={groups.map(g => ({ id: g.knowledgeGroupId, name: g.knowledgeGroupName }))}
                    selectedId={form.knowledgeGroupId}
                    onSelect={(id) => setField('knowledgeGroupId', id)}
                />
                <VacancyGroupSelect
                    title="Выберите дополнительные вопросы"
                    items={additionalGroups.map(a => ({ id: a.additionalQuestionGroupId, name: a.additionalQuestionGroupName }))}
                    selectedId={form.additionalQuestionGroupId}
                    onSelect={(id) => setField('additionalQuestionGroupId', id)}
                />

                {/* Кнопка */}
                {/* <button
                    disabled={!isValid}
                    className="bg-green-400/70 backdrop-blur-md border border-white/50 rounded-md w-full p-2 text-sm
                        hover:bg-green-500/70 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Сохранить вакансию
                </button> */}
            </div>

            {/* Превью */}
            <div>
                <VacancyPreview
                    form={form}
                    isValid={isValid}
                    onClearField={clearField}
                    ecosystemName={findName(ecosystems.map(e => ({ id: e.ecosystemId, name: e.ecosystemName })), form.ecosystemId)}
                    categoryName={findName(category.map(c => ({ id: c.vacancyCategoryId, name: c.vacancyCategoryName })), form.vacancyCategoryId)}
                    questionGroupName={findName(items.map(i => ({ id: i.questionGroupId, name: i.questionGroupName })), form.questionGroupId)}
                    knowledgeGroupName={findName(groups.map(g => ({ id: g.knowledgeGroupId, name: g.knowledgeGroupName })), form.knowledgeGroupId)}
                    additionalGroupName={findName(additionalGroups.map(a => ({ id: a.additionalQuestionGroupId, name: a.additionalQuestionGroupName })), form.additionalQuestionGroupId)}
                    // фильтры — передашь когда подключишь данные из useAdminFilters
                    workScheduleName={findName(workScheduleItems, form.workScheduleId)}
                    salaryName={findName(salaryItems, form.salaryId)}
                    experienceName={findName(experienceItems, form.experienceId)}
                    educationName={findName(educationItems, form.educationId)}
                    specializationNames={findNames(specializationItems, form.specializationId)}
                    regionNames={findNames(regionItems, form.regionId)}
                    advantageNames={findNames(advantageItems, form.advantageId)}
                    selectedPicture={pictures.find(p => p.pictureId === form.vacancyPicturesId)}
                    onSave={() => createVacancy()}
                    isLoading={isCreating}
                />
            </div>
        </div>
    )
}