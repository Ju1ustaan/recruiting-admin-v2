'use client'

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { questionApi, questionAnswerApi } from "@/entities/vacancy-tests/api/question"
import { UpdateQuestionDto, SaveAllQuestionDto } from "@/entities/vacancy-tests/model/types"
import { useSnackbar } from "@/shared/admin-snackbar"

export const useQuestionList = (questionGroupId: number) => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()

    const { data: group, isLoading } = useQuery({
        queryKey: ['question-group', questionGroupId],
        queryFn: () => questionApi.getByGroupId(questionGroupId),
    })

    const { mutate: createQuestion, isPending: isCreating } = useMutation({
    mutationFn: async ({ questionText, milliseconds, answers }: {
        questionText: string
        milliseconds: number
        answers: { answerText: string, isTrue: boolean }[]
    }) => {
        // 1. Создаём вопрос
        const question = await questionApi.create({
            questionText,
            milliseconds,
            numbering: (group?.questions.length ?? 0) + 1,
            questionGroupId,
        })

        // 2. Создаём ответы параллельно
        await Promise.all(
            answers.map(answer =>
                questionAnswerApi.create({
                    answerText: answer.answerText,
                    isTrue: answer.isTrue,
                    questionId: question.questionId,
                })
            )
        )
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['question-group', questionGroupId] })
        success('Вопрос добавлен')
    },
    onError: () => error('Ошибка при добавлении'),
})

    const { mutate: updateQuestion, isPending: isUpdating } = useMutation({
        mutationFn: (dto: UpdateQuestionDto) => questionApi.update(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['question-group', questionGroupId] })
            success('Вопрос обновлён')
        },
        onError: () => error('Ошибка при обновлении'),
    })

    const { mutate: deleteQuestion, variables: deletingId, isPending: isDeleting } = useMutation({
        mutationFn: (id: number) => questionApi.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['question-group', questionGroupId] })
            success('Вопрос удалён')
        },
        onError: () => error('Ошибка при удалении'),
    })

    const { mutate: saveAllQuestions, isPending: isSavingAll } = useMutation({
        mutationFn: (dto: SaveAllQuestionDto[]) => questionApi.saveAll(dto),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['question-group', questionGroupId] })
            success('Вопросы сохранены')
        },
        onError: () => error('Ошибка при сохранении'),
    })

    return {
        questions: group?.questions ?? [],
        groupInfo: group,
        isLoading,
        isCreating,
        isUpdating,
        isDeleting,
        isSavingAll,
        deletingId,
        createQuestion,
        updateQuestion,
        deleteQuestion,
        saveAllQuestions,
    }
}