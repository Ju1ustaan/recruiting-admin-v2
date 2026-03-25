'use client'

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/ui/admin-snackbar"
import { additionalApi, AdditionalQuestionDto, AdditionalGroupDto } from "@/entities/vacancy-tests/api/additional"

const emptyQuestion = (numbering: number): AdditionalQuestionDto => ({
    questionType: 'TEST',
    numbering,
    additionalQuestion: '',
    milliseconds: 30000,
    essayLength: 0,
})

const initialForm = (): AdditionalGroupDto => ({
    additionalQuestionGroupName: '',
    additionalQuestionDtoList: [emptyQuestion(1)],
})

export const useAdditionalGroup = () => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()
    const [form, setForm] = useState<AdditionalGroupDto>(initialForm())

    // ─── Валидация ────────────────────────────────────
    const isValid =
        !!form.additionalQuestionGroupName.trim() &&
        form.additionalQuestionDtoList.length > 0 &&
        form.additionalQuestionDtoList.every(q =>
            !!q.additionalQuestion.trim() &&
            q.milliseconds > 0
        )

    // ─── Сохранение ───────────────────────────────────
    const { mutate: saveAll, isPending } = useMutation({
        mutationFn: () => additionalApi.saveAll([form]),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['additional-question-groups'] })
            success('Группа дополнительных вопросов сохранена')
            setForm(initialForm())
        },
        onError: () => error('Ошибка при сохранении'),
    })

    // ─── Название группы ──────────────────────────────
    const setGroupName = (value: string) =>
        setForm(prev => ({ ...prev, additionalQuestionGroupName: value }))

    // ─── Вопросы ──────────────────────────────────────
    const addQuestion = () =>
        setForm(prev => ({
            ...prev,
            additionalQuestionDtoList: [
                ...prev.additionalQuestionDtoList,
                emptyQuestion(prev.additionalQuestionDtoList.length + 1),
            ],
        }))

    const removeQuestion = (index: number) =>
        setForm(prev => ({
            ...prev,
            additionalQuestionDtoList: prev.additionalQuestionDtoList.filter((_, i) => i !== index),
        }))

    const updateQuestion = (index: number, field: keyof AdditionalQuestionDto, value: unknown) =>
        setForm(prev => ({
            ...prev,
            additionalQuestionDtoList: prev.additionalQuestionDtoList.map((q, i) =>
                i === index ? { ...q, [field]: value } : q
            ),
        }))

    return {
        form,
        isValid,
        isPending,
        saveAll,
        setGroupName,
        addQuestion,
        removeQuestion,
        updateQuestion,
    }
}