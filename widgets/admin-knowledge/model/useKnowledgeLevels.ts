'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/ui/admin-snackbar"
import { knowledgeApi } from "@/entities/vacancy-tests"

export const useKnowledgeLevels = (knowledgeGroupId: number) => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()

    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: ['knowledge-group', knowledgeGroupId] })

    const { mutate: createLevel, isPending: isCreating } = useMutation({
        mutationFn: ({ knowledgeLevelText, knowledgeId }: { knowledgeLevelText: string, knowledgeId: number }) =>
            knowledgeApi.saveLevel(knowledgeLevelText, knowledgeId),
        onSuccess: () => { invalidate(); success('Уровень добавлен') },
        onError: () => error('Ошибка при добавлении'),
    })

    const { mutate: updateLevel, isPending: isUpdating } = useMutation({
        mutationFn: (dto: { knowledgeLevelId: number, knowledgeLevelText: string, knowledgeId: number }) =>
            knowledgeApi.editLevel(dto),
        onSuccess: () => { invalidate(); success('Уровень обновлён') },
        onError: () => error('Ошибка при обновлении'),
    })

    const { mutate: deleteLevel, variables: deletingLevelId, isPending: isDeleting } = useMutation({
        mutationFn: (knowledgeLevelId: number) => knowledgeApi.deleteLevel(knowledgeLevelId),
        onSuccess: () => { invalidate(); success('Уровень удалён') },
        onError: () => error('Ошибка при удалении'),
    })

    return {
        createLevel,
        isCreating,
        updateLevel,
        isUpdating,
        deleteLevel,
        deletingLevelId,
        isDeleting,
    }
}