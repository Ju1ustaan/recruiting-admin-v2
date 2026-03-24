'use client'

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/admin-snackbar"
import {
    additionalApi,
    CreateAdditionalQuestionDto,
    UpdateAdditionalQuestionDto,
} from "@/entities/vacancy-tests/api/additional"

export const useAdditionalList = (additionalQuestionGroupId: number) => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()

    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: ['additional-group', additionalQuestionGroupId] })

    const invalidateAll = () =>
        queryClient.invalidateQueries({ queryKey: ['additional-question-groups'] })

    // ─── GET ──────────────────────────────────────────
    const { data: group, isLoading } = useQuery({
        queryKey: ['additional-group', additionalQuestionGroupId],
        queryFn: () => additionalApi.getById(additionalQuestionGroupId),
    })

    // ─── Группа: редактирование ───────────────────────
    const { mutate: updateGroup } = useMutation({
        mutationFn: (additionalQuestionGroupName: string) =>
            additionalApi.updateGroup({ additionalQuestionGroupId, additionalQuestionGroupName }),
        onSuccess: () => { invalidate(); invalidateAll(); success('Группа обновлена') },
        onError: () => error('Ошибка при обновлении'),
    })

    // ─── Группа: удаление ─────────────────────────────
    const { mutate: deleteGroup, isPending: isDeletingGroup } = useMutation({
        mutationFn: () => additionalApi.deleteGroup(additionalQuestionGroupId),
        onSuccess: () => { invalidateAll(); success('Группа удалена') },
        onError: () => error('Ошибка при удалении'),
    })

    // ─── Вопрос: создание ─────────────────────────────
    const { mutate: createQuestion, isPending: isCreating } = useMutation({
        mutationFn: (dto: Omit<CreateAdditionalQuestionDto, 'additionalQuestionGroupId'>) =>
            additionalApi.createQuestion({
                ...dto,
                additionalQuestionGroupId,
                numbering: (group?.additionalQuestions.length ?? 0) + 1,
            }),
        onSuccess: () => { invalidate(); success('Вопрос добавлен') },
        onError: () => error('Ошибка при добавлении'),
    })

    // ─── Вопрос: редактирование ───────────────────────
    const { mutate: updateQuestion, isPending: isUpdatingQuestion } = useMutation({
        mutationFn: (dto: UpdateAdditionalQuestionDto) => additionalApi.updateQuestion(dto),
        onSuccess: () => { invalidate(); success('Вопрос обновлён') },
        onError: () => error('Ошибка при обновлении'),
    })

    // ─── Вопрос: удаление ─────────────────────────────
    const { mutate: deleteQuestion, variables: deletingQuestionId, isPending: isDeletingQuestion } = useMutation({
        mutationFn: (additionalQuestionId: number) => additionalApi.deleteQuestion(additionalQuestionId),
        onSuccess: () => { invalidate(); success('Вопрос удалён') },
        onError: () => error('Ошибка при удалении'),
    })

    return {
        group,
        questions: group?.additionalQuestions ?? [],
        isLoading,
        updateGroup,
        deleteGroup,
        isDeletingGroup,
        createQuestion,
        isCreating,
        updateQuestion,
        isUpdatingQuestion,
        deleteQuestion,
        deletingQuestionId,
        isDeletingQuestion,
    }
}