'use client'

import { useState } from "react"
import { GroupFormWrapper } from "@/shared/group-form-wrapper"
import { useEcosystem } from "../model/useEcosystem"

interface EcosystemFormState {
    ecosystemName: string
    ecosystemPictureName: string
    ecosystemDescription: string
}

const initialForm = (): EcosystemFormState => ({
    ecosystemName: '',
    ecosystemPictureName: '',
    ecosystemDescription: '',
})

export const EcosystemForm = () => {
    const { createEcosystem, isCreating } = useEcosystem()
    const [form, setForm] = useState<EcosystemFormState>(initialForm())

    const isValid =
        !!form.ecosystemName.trim() &&
        !!form.ecosystemPictureName.trim() &&
        !!form.ecosystemDescription.trim()

    const handleSubmit = () => {
        createEcosystem(
            {
                ecosystemId: 0,
                ecosystemName: form.ecosystemName.trim(),
                ecosystemPictureName: form.ecosystemPictureName.trim(),
                ecosystemDescription: form.ecosystemDescription.trim(),
            },
            { onSuccess: () => setForm(initialForm()) }
        )
    }

    const handleChange = (field: keyof EcosystemFormState, value: string) =>
        setForm(prev => ({ ...prev, [field]: value }))

    return (
        <GroupFormWrapper
            title="Добавить экосистему"
            onSubmit={handleSubmit}
            isLoading={isCreating}
            isValid={isValid}
            submitLabel="Добавить"
        >
            <div>
                <label className="text-xs text-gray-500 mb-1 block">Название</label>
                <input
                    type="text"
                    value={form.ecosystemName}
                    onChange={(e) => handleChange('ecosystemName', e.target.value)}
                    className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                    placeholder="Например: МБанк"
                />
            </div>

            <div>
                <label className="text-xs text-gray-500 mb-1 block">Название картинки</label>
                <input
                    type="text"
                    value={form.ecosystemPictureName}
                    onChange={(e) => handleChange('ecosystemPictureName', e.target.value)}
                    className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                    placeholder="Например: mbank.png"
                />
            </div>

            <div>
                <label className="text-xs text-gray-500 mb-1 block">Описание</label>
                <textarea
                    value={form.ecosystemDescription}
                    onChange={(e) => handleChange('ecosystemDescription', e.target.value)}
                    rows={3}
                    className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400 resize-none"
                    placeholder="Краткое описание экосистемы..."
                />
            </div>
        </GroupFormWrapper>
    )
}