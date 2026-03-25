'use client'

import { useState } from "react"
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query"
import { useSnackbar } from "@/shared/ui/admin-snackbar"
import { knowledgeApi, KnowledgeDto, KnowledgeGroupDto } from "@/entities/vacancy-tests/api/knowledge"

const emptyKnowledge = (): KnowledgeDto => ({
    knowledgeId: 0,
    knowledgeText: '',
    knowledgeLevels: [{ knowledgeLevelId: 0, knowledgeLevelText: '' }],
})

const initialForm = (): KnowledgeGroupDto => ({
    knowledgeGroupId: 0,
    knowledgeGroupName: '',
    knowledge: [emptyKnowledge()],
})

export const useKnowledgeGroup = () => {
    const { success, error } = useSnackbar()
    const queryClient = useQueryClient()
    const [form, setForm] = useState<KnowledgeGroupDto>(initialForm())

    // ─── Валидация ────────────────────────────────────
    const isValid =
        !!form.knowledgeGroupName.trim() &&
        form.knowledge.length > 0 &&
        form.knowledge.every(k =>
            !!k.knowledgeText.trim() &&
            k.knowledgeLevels.length > 0 &&
            k.knowledgeLevels.every(l => !!l.knowledgeLevelText.trim())
        )

    // ─── Сохранение ───────────────────────────────────
    const { mutate: saveAll, isPending } = useMutation({
        mutationFn: () => knowledgeApi.saveAll([form]),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['knowledge-groups'] })
            success('Группа знаний сохранена')
            setForm(initialForm())
        },
        onError: () => error('Ошибка при сохранении'),
    })

    // ─── Знания ───────────────────────────────────────
    const addKnowledge = () =>
        setForm(prev => ({ ...prev, knowledge: [...prev.knowledge, emptyKnowledge()] }))

    const removeKnowledge = (index: number) =>
        setForm(prev => ({ ...prev, knowledge: prev.knowledge.filter((_, i) => i !== index) }))

    const updateKnowledge = (index: number, value: string) =>
        setForm(prev => ({
            ...prev,
            knowledge: prev.knowledge.map((k, i) => i === index ? { ...k, knowledgeText: value } : k),
        }))

    // ─── Уровни ───────────────────────────────────────
    const addLevel = (kIndex: number) =>
        setForm(prev => ({
            ...prev,
            knowledge: prev.knowledge.map((k, i) =>
                i === kIndex
                    ? { ...k, knowledgeLevels: [...k.knowledgeLevels, { knowledgeLevelId: 0, knowledgeLevelText: '' }] }
                    : k
            ),
        }))

    const removeLevel = (kIndex: number, lIndex: number) =>
        setForm(prev => ({
            ...prev,
            knowledge: prev.knowledge.map((k, i) =>
                i === kIndex
                    ? { ...k, knowledgeLevels: k.knowledgeLevels.filter((_, j) => j !== lIndex) }
                    : k
            ),
        }))

    const updateLevel = (kIndex: number, lIndex: number, value: string) =>
        setForm(prev => ({
            ...prev,
            knowledge: prev.knowledge.map((k, i) =>
                i === kIndex ? {
                    ...k,
                    knowledgeLevels: k.knowledgeLevels.map((l, j) =>
                        j === lIndex ? { ...l, knowledgeLevelText: value } : l
                    ),
                } : k
            ),
        }))

         const { data: groups = [], isLoading } = useQuery({
        queryKey: ['knowledge-groups'],
        queryFn: () => knowledgeApi.getAll(),
    })

    const setGroupName = (value: string) =>
        setForm(prev => ({ ...prev, knowledgeGroupName: value }))

    return {
        groups,
        form,
        isValid,
        isPending,
        isLoading,
        saveAll,
        setGroupName,
        addKnowledge,
        removeKnowledge,
        updateKnowledge,
        addLevel,
        removeLevel,
        updateLevel,
    }
}