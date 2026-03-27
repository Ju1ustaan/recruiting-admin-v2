'use client'

import { useState, useEffect } from "react"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/ui/admin-snackbar"
import { vacancyApi, UpdateVacancyDto, VacancyItem } from "@/entities/vacancy/api/vacancyApi"

export const useVacancyEdit = (vacancyId: number) => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()

    // ─── GET по ID ────────────────────────────────────
    const { data: vacancy, isLoading } = useQuery({
        queryKey: ['vacancy', vacancyId],
        queryFn: () => vacancyApi.getById(vacancyId),
    })

    const [form, setForm] = useState<UpdateVacancyDto | null>(null)

    useEffect(() => {
        if (!vacancy) return
        setForm({
    vacancyId: vacancy.vacancyId,
    vacancyName: vacancy.vacancyName,
    isActive: vacancy.isActive,
        cvIsActive: vacancy.cvIsActive ,
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
    }, [vacancy?.vacancyId])

    const invalidate = () => {
        queryClient.invalidateQueries({ queryKey: ['vacancy', vacancyId] })
        queryClient.invalidateQueries({ queryKey: ['vacancies', true] })
        queryClient.invalidateQueries({ queryKey: ['vacancies', false] })
    }

    const { mutate: updateVacancy, isPending: isUpdating } = useMutation({
        mutationFn: () => vacancyApi.update(form!),
        onSuccess: () => { invalidate(); success('Вакансия обновлена') },
        onError: () => error('Ошибка при обновлении'),
    })

    const setField = <K extends keyof UpdateVacancyDto>(key: K, value: UpdateVacancyDto[K]) =>
        setForm(prev => prev ? { ...prev, [key]: value } : prev)

    const isValid = !!form?.vacancyName.trim()

    return {
        vacancy,
        isLoading,
        form,
        setField,
        isValid,
        updateVacancy,
        isUpdating,
    }
}