'use client'

import { useState } from "react"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/ui/admin-snackbar"
import { vacancyApi, CreateVacancyDto, UpdateVacancyDto, VacancyItem } from "@/entities/vacancy/api/vacancyApi"


export interface VacancyFormDto {
    vacancyName: string
    isActive: boolean
    cvIsActive: boolean
    workScheduleId: number
    salaryId: number
    experienceId: number
    specializationId: number[]
    educationId: number
    advantageId: number[]
    vacancyCategoryId: number
    ecosystemId: number
    regionId: number[]
    questionGroupId: number
    knowledgeGroupId: number
    additionalQuestionGroupId: number
    vacancyPicturesId: number
    managerEmails: { email: string }[]
}

const initialForm = (): VacancyFormDto => ({
    vacancyName: '',
    isActive: false,
    cvIsActive: false,
    workScheduleId: 0,
    salaryId: 0,
    experienceId: 0,
    specializationId: [],
    educationId: 0,
    advantageId: [],
    vacancyCategoryId: 0,
    ecosystemId: 0,
    regionId: [],
    questionGroupId: 0,
    knowledgeGroupId: 0,
    additionalQuestionGroupId: 0,
    vacancyPicturesId: 0,
    managerEmails: [],
})

// ─── Конвертация массивов в одиночные значения для DTO ─
const toDto = (form: VacancyFormDto): CreateVacancyDto => ({
    ...form,
    specializationId: form.specializationId[0] ?? 0,
    regionId: form.regionId[0] ?? 0,
    advantageId: form.advantageId[0] ?? 0,
})

export const useVacancyForm = () => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()
    const [form, setForm] = useState<VacancyFormDto>(initialForm())
    const [isActive, setIsActive] = useState(true)

    const invalidate = () => queryClient.invalidateQueries({ queryKey: ['vacancies', isActive] })

    // ─── GET ──────────────────────────────────────────
    const { data: vacancies = [], isLoading: isLoadingVacancies } = useQuery({
        queryKey: ['vacancies', isActive],
        queryFn: () => vacancyApi.getByActive(isActive),
    })

    // ─── Создание ─────────────────────────────────────
    const { mutate: createVacancy, isPending: isCreating } = useMutation({
        mutationFn: () => vacancyApi.create(toDto(form)),
        onSuccess: () => {
            invalidate()
            success('Вакансия создана')
            setForm(initialForm())
        },
        onError: () => error('Ошибка при создании'),
    })

    // ─── Обновление (тогл публикации) ─────────────────
    const { mutate: updateVacancy, isPending: isUpdating } = useMutation({
        mutationFn: (dto: UpdateVacancyDto) => vacancyApi.update(dto),
        onSuccess: () => { invalidate(); success('Вакансия обновлена') },
        onError: () => error('Ошибка при обновлении'),
    })

    // ─── Удаление ─────────────────────────────────────
    const { mutate: deleteVacancy, variables: deletingId, isPending: isDeleting } = useMutation({
        mutationFn: (vacancyId: number) => vacancyApi.delete(vacancyId),
        onSuccess: () => { invalidate(); success('Вакансия удалена') },
        onError: () => error('Ошибка при удалении'),
    })

    // ─── Хелперы формы ────────────────────────────────
    const setField = <K extends keyof VacancyFormDto>(key: K, value: VacancyFormDto[K]) =>
        setForm(prev => ({ ...prev, [key]: value }))

    const clearField = <K extends keyof VacancyFormDto>(key: K, defaultValue: VacancyFormDto[K]) =>
        setForm(prev => ({ ...prev, [key]: defaultValue }))

    const toggleArrayField = (key: 'specializationId' | 'regionId' | 'advantageId', id: number) =>
        setForm(prev => {
            const arr = prev[key] as number[]
            return {
                ...prev,
                [key]: arr.includes(id) ? arr.filter(i => i !== id) : [...arr, id],
            }
        })

    const isValid =
        !!form.vacancyName.trim() &&
        form.ecosystemId !== 0 &&
        form.vacancyCategoryId !== 0
        form.vacancyPicturesId !== 0
        form.workScheduleId !== 0

 const togglePublish = (vacancy: VacancyItem) => {
     updateVacancy({
        vacancyId: vacancy.vacancyId,
        vacancyName: vacancy.vacancyName,
        cvIsActive: vacancy.cvIsActive ,
        isActive: !vacancy.isActive,
        workScheduleId: vacancy.workSchedule?.workScheduleId ?? null,
        salaryId: vacancy.salary?.salaryId ?? null,
        experienceId: vacancy.experience?.experienceId ?? null,
        specializationId: vacancy.specialization?.specializationId ?? null,
        educationId: vacancy.education?.educationId ?? null,
        advantageId: vacancy.advantage?.advantageId ?? null,
        vacancyCategoryId: vacancy.vacancyCategoryId ?? null,
        ecosystemId: vacancy.ecosystemId ?? null,
        regionId: vacancy.region?.regionId ?? null,
        questionGroupId: vacancy.questionGroupId ?? null,
        knowledgeGroupId: vacancy.knowledgeGroupId ?? null,
        additionalQuestionGroupId: vacancy.additionalQuestionGroupId ?? null,
        vacancyPicturesId: vacancy.vacancyPictures?.pictureId ?? null,
    })
}
 const toggleCvActivated = (vacancy: VacancyItem) => {
     updateVacancy({
        vacancyId: vacancy.vacancyId,
        vacancyName: vacancy.vacancyName,
        cvIsActive: !vacancy.cvIsActive ,
        isActive: vacancy.isActive,
        workScheduleId: vacancy.workSchedule?.workScheduleId ?? null,
        salaryId: vacancy.salary?.salaryId ?? null,
        experienceId: vacancy.experience?.experienceId ?? null,
        specializationId: vacancy.specialization?.specializationId ?? null,
        educationId: vacancy.education?.educationId ?? null,
        advantageId: vacancy.advantage?.advantageId ?? null,
        vacancyCategoryId: vacancy.vacancyCategoryId ?? null,
        ecosystemId: vacancy.ecosystemId ?? null,
        regionId: vacancy.region?.regionId ?? null,
        questionGroupId: vacancy.questionGroupId ?? null,
        knowledgeGroupId: vacancy.knowledgeGroupId ?? null,
        additionalQuestionGroupId: vacancy.additionalQuestionGroupId ?? null,
        vacancyPicturesId: vacancy.vacancyPictures?.pictureId ?? null,
    })
}


    return {
        // форма
        form,
        setField,
        clearField,
        toggleArrayField,
        isValid,
        createVacancy,
        isCreating,
        // список
        vacancies,
        isLoadingVacancies,
        isActive,
        setIsActive,
        updateVacancy,
        isUpdating,
        deleteVacancy,
        deletingId,
        isDeleting,
        togglePublish,
        toggleCvActivated
    }
}