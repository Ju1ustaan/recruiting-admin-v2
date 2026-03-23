'use client'

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { vacancySettingsApi } from "@/entities/vacancy-settings"
import { useSnackbar } from "@/shared/admin-snackbar"

export const useAdminFilters = (name: string) => {
  const { success, error } = useSnackbar()
  const queryClient = useQueryClient()
  const [inputValue, setInputValue] = useState('')

  const { data: items = [], isLoading } = useQuery({
    queryKey: ['vacancy-settings', name],
    queryFn: () => vacancySettingsApi.getAll(name),
  })

  const { mutate: createItem, isPending: isCreating } = useMutation({
    mutationFn: (value: string) => vacancySettingsApi.create(name, value),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancy-settings', name] })
      setInputValue('')
      success('Успешно добавлено')
    },
    onError: () => error('Ошибка при добавлении'),
  })

  const { mutate: deleteItem, variables: deletingId, isPending: isDeleting } = useMutation({
    mutationFn: (id: number) => vacancySettingsApi.delete(name, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['vacancy-settings', name] })
      success('Удалено')
    },
    onError: () => error('Ошибка при удалении'),
  })

  const handleCreate = () => {
    if (!inputValue.trim()) return
    createItem(inputValue.trim())
  }

  return {
    items,
    isLoading,
    inputValue,
    setInputValue,
    handleCreate,
    isCreating,
    deleteItem,
    deletingId,
    isDeleting,
  }
}