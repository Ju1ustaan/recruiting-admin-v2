'use client'

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/admin-snackbar"
import { CreateCategoryDto, UpdateCategoryDto, vacancyCategory } from "@/entities/vacancy-category"

export const useCategory = () => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()

    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: ['category'] })
 const { data: category = [], isLoading } = useQuery({
        queryKey: ['category'],
        queryFn: () => vacancyCategory.get(),
    })
    // ─── Создание ─────────────────────────────────────
    const { mutate: createCategory, isPending: isCreating } = useMutation({
        mutationFn: (dto: CreateCategoryDto) => vacancyCategory.create(dto),
        onSuccess: () => { invalidate(); success('Категория добавлена') },
        onError: () => error('Ошибка при добавлении'),
    })

    // ─── Редактирование ───────────────────────────────
    const { mutate: updateCategory, isPending: isUpdating } = useMutation({
        mutationFn: (dto: UpdateCategoryDto) => vacancyCategory.update(dto),
        onSuccess: () => { invalidate(); success('Категория обновлена') },
        onError: () => error('Ошибка при обновлении'),
    })

    // ─── Удаление ─────────────────────────────────────
    const { mutate: deleteCategory, variables: deletingId, isPending: isDeleting } = useMutation({
        mutationFn: (ecosystemId: number) => vacancyCategory.delete(ecosystemId),
        onSuccess: () => { invalidate(); success('Категория удалена') },
        onError: () => error('Ошибка при удалении'),
    })

    return {
        createCategory,
        isCreating,
        updateCategory,
        isUpdating,
        deleteCategory,
        deletingId,
        isDeleting,
        category,
        isLoading,
    }
}