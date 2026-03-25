'use client'

import { useState } from "react"

import { ConfirmDialog } from "@/shared/confirm-dialog"
import { ChoiceSelect } from "@/shared/choice-select"

import { Picture } from "@/entities/picture"
import { UpdateEcosystemDto, EcosystemList } from "@/entities/vacancy-ecosystem"
import { CategoryList, UpdateCategoryDto } from "@/entities/vacancy-category"

import { Pencil, Trash2, Check, X, Loader } from "lucide-react"

interface ItemProps<TItem, TUpdateDto> {
    item: TItem
    isDeleting: boolean
    isUpdating: boolean
    onUpdate: (dto: TUpdateDto) => void
    onDelete: (id: number) => void
    pictures: Picture[]

    // 🔥 конфигурация
    getId: (item: TItem) => number
    mapToForm: (item: TItem) => FormState
    mapToDto: (form: FormState, img: string, item: TItem) => TUpdateDto

    renderTitle: (item: TItem) => string
    renderDescription: (item: TItem) => string
    renderImage: (item: TItem) => string
}

interface FormState {
    name: string
    description: string
    picture: string
}
const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''

export const EcosystemItem = <TItem, TUpdateDto>({
    item,
    isDeleting,
    isUpdating,
    onUpdate,
    onDelete,
    pictures,
    getId,
    mapToForm,
    mapToDto,
    renderTitle,
    renderDescription,
    renderImage
}: ItemProps<TItem, TUpdateDto>) => {

    const [showConfirm, setShowConfirm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [choiceImg, setChoiceImg] = useState('')
    const [form, setForm] = useState<FormState>(() => mapToForm(item))

    const handleSave = () => {
        const dto = mapToDto(form, choiceImg, item)
        onUpdate(dto)
        setIsEditing(false)
    }

    const handleCancel = () => {
        setForm(mapToForm(item))
        setIsEditing(false)
    }

    return (
        <>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-xl p-4 space-y-3 group">
                <div className="flex items-start justify-between gap-3">

                    <div className="flex-1 space-y-2">
                        {isEditing ? (
                            <div className="flex gap-2">
                                <div className="w-1/3">
                                    <img src={`${BASE_URL}/${choiceImg || form.picture}`} />
                                </div>

                                <div className="w-2/3 flex flex-col gap-2">
                                    <input
                                        value={form.name}
                                        onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                                        className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                        placeholder="Название"
                                    />

                                    <textarea
                                        value={form.description}
                                        onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                                        className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400 resize-none"
                                        placeholder="Описание"
                                    />

                                    <ChoiceSelect
                                        choiceImg={choiceImg}
                                        setChoiceImg={setChoiceImg}
                                        selected={form}
                                        items={pictures}
                                    />
                                </div>
                            </div>
                        ) : (
                            <div className="flex gap-2">
                                <div className="w-1/3">
                                    <img className="h-full w-full object-contain" src={`${BASE_URL}/${renderImage(item)}`} />
                                </div>

                                <div className="w-2/3">
                                    <p className="font-semibold">{renderTitle(item)}</p>
                                    <p className="text-sm">{renderDescription(item)}</p>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-1">
                        {isEditing ? (
                            <>
                                <button onClick={handleSave} disabled={isUpdating} className="p-1.5 rounded text-white bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-50">
                                    {isUpdating ? <Loader className="animate-spin" /> : <Check className="w-4 h-4"/>}
                                </button>
                                <button onClick={handleCancel} className="p-1.5 rounded text-gray-400 hover:bg-gray-200 transition-colors">
                                    <X className="w-4 h-4"/>
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setIsEditing(true)} className="p-1.5 rounded text-gray-300 hover:text-blue-500 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all">
                                    <Pencil className="w-4 h-4"/>
                                </button>
                                <button onClick={() => setShowConfirm(true)} className="p-1.5 rounded text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50">
                                    {isDeleting ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4"/>}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmDialog
                isOpen={showConfirm}
                title="Удалить?"
                description={renderTitle(item)}
                isLoading={isDeleting}
                onConfirm={() => {
                    onDelete(getId(item))
                    setShowConfirm(false)
                }}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    )
}