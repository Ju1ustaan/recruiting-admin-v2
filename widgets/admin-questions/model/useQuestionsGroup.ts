'use client'

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/ui/admin-snackbar"
import { questionGroupApi } from "@/entities/vacancy-tests"
import { SaveAllQuestionDto } from "@/entities/vacancy-tests"
import { questionApi } from "@/entities/vacancy-tests"

export const useQuestionsGroup = () => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()

    // ─── Список групп ──────────────────────────────────
    const { data: items = [], isLoading } = useQuery({
        queryKey: ['question-group'],
        queryFn: () => questionGroupApi.getAll(),
    })

    // ─── Удаление группы ───────────────────────────────
    const { mutate: deleteItem, variables: deletingId, isPending: isDeleting } = useMutation({
        mutationFn: (id: number) => questionGroupApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['question-group'] })
            success('Группа удалена')
        },
        onError: () => error('Ошибка при удалении'),
    })

    // ─── Обновление группы ─────────────────────────────
    const { mutate: updateItem } = useMutation({
        mutationFn: questionGroupApi.update,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['question-group'] })
            success('Группа обновлена')
        },
        onError: () => error('Ошибка при обновлении'),
    })

    // ─── Сохранение группы с вопросами (bulk) ──────────
    const { mutate: saveAll, isPending: isSaving } = useMutation({
        mutationFn: (dto: SaveAllQuestionDto[]) => questionApi.saveAll(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['question-group'] })
            success('Группа вопросов сохранена')
        },
        onError: () => error('Ошибка при сохранении'),
    })

    return {
        items,
        isLoading,
        deleteItem,
        deletingId,
        isDeleting,
        updateItem,
        saveAll,
        isSaving,
    }
}