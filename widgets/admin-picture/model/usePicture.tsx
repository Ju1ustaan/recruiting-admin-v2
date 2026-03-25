'use client'

import { useState } from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/admin-snackbar"
import { pictureApi } from "@/entities/picture/api/pictureApi"

export const usePicture = () => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()

    const [file, setFile] = useState<File | null>(null)
    const [preview, setPreview] = useState<string | null>(null)
    const [description, setDescription] = useState('')

    // ─── GET ──────────────────────────────────────────
    const { data: pictures = [], isLoading } = useQuery({
        queryKey: ['pictures'],
        queryFn: () => pictureApi.getAll(),
    })

    // ─── POST ─────────────────────────────────────────
    const { mutate: savePicture, isPending: isSaving } = useMutation({
        mutationFn: () => pictureApi.save(description, file!),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pictures'] })
            success('Картинка сохранена')
            reset()
        },
        onError: () => error('Ошибка при сохранении'),
    })

    // ─── DELETE ───────────────────────────────────────
    const { mutate: deletePicture, variables: deletingId, isPending: isDeleting } = useMutation({
        mutationFn: ({ id, pictureName }: { id: number, pictureName: string }) =>
            pictureApi.delete(id, pictureName),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pictures'] })
            success('Картинка удалена')
        },
        onError: () => error('Ошибка при удалении'),
    })

    const processFile = (f: File) => {
        setFile(f)
        const reader = new FileReader()
        reader.onload = () => setPreview(reader.result as string)
        reader.readAsDataURL(f)
    }

    const handleFile = (f: File | undefined) => {
        if (!f) return
        const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
        if (!allowed.includes(f.type)) {
            error('Допустимые форматы: jpg, png, jpeg, webp')
            return
        }
        processFile(f)
    }

    const reset = () => {
        setFile(null)
        setPreview(null)
        setDescription('')
    }

    return {
        // форма
        file,
        preview,
        description,
        setDescription,
        handleFile,
        savePicture,
        isSaving,
        isValid: !!file && !!description.trim(),
        reset,
        // список
        pictures,
        isLoading,
        deletePicture,
        deletingId,
        isDeleting,
    }
}