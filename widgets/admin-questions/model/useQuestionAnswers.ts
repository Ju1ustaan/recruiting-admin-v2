'use client'

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/admin-snackbar"
import { questionAnswerApi } from "@/entities/vacancy-tests"

export const useQuestionAnswers = (questionGroupId: number, questionId: number) => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()

    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: ['question-group', questionGroupId] })

    // ─── Создание ─────────────────────────────────────
    const { mutate: createAnswer, isPending: isCreating } = useMutation({
        mutationFn: ({ answerText, isTrue }: { answerText: string, isTrue: boolean }) =>
            questionAnswerApi.create({ answerText, isTrue, questionId }),
        onSuccess: () => { invalidate(); success('Ответ добавлен') },
        onError: () => error('Ошибка при добавлении'),
    })

    // ─── Редактирование ───────────────────────────────
    const { mutate: updateAnswer, isPending: isUpdating } = useMutation({
        mutationFn: ({ answerId, answerText, isTrue }: { answerId: number, answerText: string, isTrue: boolean }) =>
            questionAnswerApi.update({ answerId, answerText, isTrue, questionId }),
        onSuccess: () => { invalidate(); success('Ответ обновлён') },
        onError: () => error('Ошибка при обновлении'),
    })

    // ─── Удаление ─────────────────────────────────────
    const { mutate: deleteAnswer, variables: deletingAnswerId, isPending: isDeleting } = useMutation({
        mutationFn: (answerId: number) => questionAnswerApi.delete(answerId),
        onSuccess: () => { invalidate(); success('Ответ удалён') },
        onError: () => error('Ошибка при удалении'),
    })

    return {
        createAnswer,
        isCreating,
        updateAnswer,
        isUpdating,
        deleteAnswer,
        deletingAnswerId,
        isDeleting,
    }
}