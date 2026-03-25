'use client'

import { useState } from "react"
import { GroupFormWrapper } from "@/shared/group-form-wrapper"
import { useEcosystem } from "../model/useEcosystem"
import { ImagesDialog } from "./ImagesDialog"
import { Picture } from "@/entities/picture"

type Props = {
    pictures: Picture[]
}
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

export const EcosystemForm = ({pictures}: Props) => {
    const [choiceImg, setChoiceImg] = useState('')
    const { createEcosystem, isCreating } = useEcosystem()
    const [form, setForm] = useState<EcosystemFormState>(initialForm())

    const isValid =
        !!form.ecosystemName.trim() &&
        !!choiceImg.trim() &&
        !!form.ecosystemDescription.trim()

    const handleSubmit = () => {
        createEcosystem(
            {
                ecosystemId: 0,
                ecosystemName: form.ecosystemName.trim(),
                ecosystemPictureName: choiceImg.trim(),
                ecosystemDescription: form.ecosystemDescription.trim(),
            },
            { onSuccess: () => setForm(initialForm()) }
        )
    }

    const handleChange = (field: keyof EcosystemFormState, value: string) => setForm(prev => ({ ...prev, [field]: value }))

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
                <ImagesDialog choiceImg={choiceImg} pictures={pictures} setChoiceImg={setChoiceImg}/>
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