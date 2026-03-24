'use client'

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/admin-snackbar"
import { knowledgeApi } from "@/entities/vacancy-tests"


export const useKnowledgeList = (knowledgeGroupId: number) => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()

    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: ['knowledge-group', knowledgeGroupId] })

    const { data: group, isLoading } = useQuery({
        queryKey: ['knowledge-group', knowledgeGroupId],
        queryFn: () => knowledgeApi.getById(knowledgeGroupId),
    })

    // ─── Редактирование группы ─────────────────────────
    const { mutate: updateGroup } = useMutation({
        mutationFn: (knowledgeGroupName: string) =>
            knowledgeApi.editGroup({ knowledgeGroupId, knowledgeGroupName }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['knowledge-groups'] })
            invalidate()
            success('Группа обновлена')
        },
        onError: () => error('Ошибка при обновлении'),
    })

    // ─── Удаление группы ──────────────────────────────
    const { mutate: deleteGroup, isPending: isDeletingGroup } = useMutation({
        mutationFn: () => knowledgeApi.deleteGroup(knowledgeGroupId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['knowledge-groups'] })
            success('Группа удалена')
        },
        onError: () => error('Ошибка при удалении'),
    })

    // ─── Добавление знания ────────────────────────────
    const { mutate: createKnowledge, isPending: isCreating } = useMutation({
        mutationFn: (knowledgeText: string) =>
            knowledgeApi.saveKnowledge(knowledgeGroupId, knowledgeText),
        onSuccess: () => { invalidate(); success('Знание добавлено') },
        onError: () => error('Ошибка при добавлении'),
    })

    // ─── Редактирование знания ────────────────────────
    const { mutate: updateKnowledge, isPending: isUpdatingKnowledge } = useMutation({
        mutationFn: (dto: { knowledgeId: number, knowledgeText: string }) =>
            knowledgeApi.editKnowledge(knowledgeGroupId, dto),
        onSuccess: () => { invalidate(); success('Знание обновлено') },
        onError: () => error('Ошибка при обновлении'),
    })

    // ─── Удаление знания ──────────────────────────────
    const { mutate: deleteKnowledge, variables: deletingKnowledgeId, isPending: isDeletingKnowledge } = useMutation({
        mutationFn: (knowledgeId: number) => knowledgeApi.deleteKnowledge(knowledgeId),
        onSuccess: () => { invalidate(); success('Знание удалено') },
        onError: () => error('Ошибка при удалении'),
    })

    return {
        group,
        knowledge: group?.knowledge ?? [],
        isLoading,
        updateGroup,
        deleteGroup,
        isDeletingGroup,
        createKnowledge,
        isCreating,
        updateKnowledge,
        isUpdatingKnowledge,
        deleteKnowledge,
        deletingKnowledgeId,
        isDeletingKnowledge,
    }
}