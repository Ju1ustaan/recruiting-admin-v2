'use client'

import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/admin-snackbar"
import { CreateEcosystemDto, UpdateEcosystemDto, vacancyEcosystem } from "@/entities/vacancy-ecosystem"
export const useEcosystem = () => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()

    const invalidate = () =>
        queryClient.invalidateQueries({ queryKey: ['ecosystems'] })
 const { data: ecosystems = [], isLoading } = useQuery({
        queryKey: ['ecosystems'],
        queryFn: () => vacancyEcosystem.get(),
    })
    // ─── Создание ─────────────────────────────────────
    const { mutate: createEcosystem, isPending: isCreating } = useMutation({
        mutationFn: (dto: CreateEcosystemDto) => vacancyEcosystem.create(dto),
        onSuccess: () => { invalidate(); success('Экосистема добавлена') },
        onError: () => error('Ошибка при добавлении'),
    })

    // ─── Редактирование ───────────────────────────────
    const { mutate: updateEcosystem, isPending: isUpdating } = useMutation({
        mutationFn: (dto: UpdateEcosystemDto) => vacancyEcosystem.update(dto),
        onSuccess: () => { invalidate(); success('Экосистема обновлена') },
        onError: () => error('Ошибка при обновлении'),
    })

    // ─── Удаление ─────────────────────────────────────
    const { mutate: deleteEcosystem, variables: deletingId, isPending: isDeleting } = useMutation({
        mutationFn: (ecosystemId: number) => vacancyEcosystem.delete(ecosystemId),
        onSuccess: () => { invalidate(); success('Экосистема удалена') },
        onError: () => error('Ошибка при удалении'),
    })

    return {
        createEcosystem,
        isCreating,
        updateEcosystem,
        isUpdating,
        deleteEcosystem,
        deletingId,
        isDeleting,
        ecosystems,
        isLoading,
    }
}