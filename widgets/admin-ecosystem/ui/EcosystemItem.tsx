'use client'

import { useState } from "react"
import { Pencil, Trash2, Check, X, Loader } from "lucide-react"
import { UpdateEcosystemDto, EcosystemList } from "@/entities/vacancy-ecosystem"
import { ConfirmDialog } from "@/shared/confirm-dialog"
import { ChoiceSelect } from "@/shared/choice-select"
import { Picture } from "@/entities/picture"

interface EcosystemItemProps {
    ecosystem: EcosystemList
    isDeleting: boolean
    isUpdating: boolean
    onUpdate: (dto: UpdateEcosystemDto) => void
    onDelete: (id: number) => void
    pictures: Picture[]
}
const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''

export const EcosystemItem = ({ ecosystem, isDeleting, isUpdating, onUpdate, onDelete, pictures }: EcosystemItemProps) => {
    const [showConfirm, setShowConfirm] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [choiceImg, setChoiceImg] = useState('')
    const [form, setForm] = useState({
        ecosystemName: ecosystem.ecosystemName,
        ecosystemPictureName: ecosystem.ecosystemPicture,
        ecosystemDescription: ecosystem.ecosystemDescription,
    })

    const handleSave = () => {
        onUpdate({ ecosystemId: ecosystem.ecosystemId,       
        ecosystemName: form.ecosystemName,
        ecosystemPictureName: choiceImg,
        ecosystemDescription: form.ecosystemDescription, })
        setIsEditing(false)
    }

    const handleCancel = () => {
        setForm({
            ecosystemName: ecosystem.ecosystemName,
            ecosystemPictureName: ecosystem.ecosystemPicture,
            ecosystemDescription: ecosystem.ecosystemDescription,
        })
        setIsEditing(false)
    }

    return (
        <>
            <div className="bg-white/40 backdrop-blur-md border border-white/50 rounded-xl p-4 space-y-3 group">

                {/* Верхняя строка */}
                <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 space-y-2">
                        {isEditing ? (
                            <>
                               <div className="flex gap-2">
                                <div className="w-1/3">
                                    <img src={`${BASE_URL}/${choiceImg || form.ecosystemPictureName}`} alt={form.ecosystemName} />
                                </div>
                                 <div className="w-2/3 flex flex-col gap-2">
                                    <input
                                    autoFocus
                                    value={form.ecosystemName}
                                    onChange={(e) => setForm(prev => ({ ...prev, ecosystemName: e.target.value }))}
                                    className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                    placeholder="Название"
                                />
                                <textarea
                                    value={form.ecosystemDescription}
                                    onChange={(e) => setForm(prev => ({ ...prev, ecosystemDescription: e.target.value }))}
                                    rows={2}
                                    className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400 resize-none"
                                    placeholder="Описание"
                                />
                                <ChoiceSelect choiceImg={choiceImg} setChoiceImg={setChoiceImg} selected={form} items={pictures}/>
                                 </div>
                               </div>
                            </>
                        ) : (
                            <>
                                <div className="flex gap-2">
                                    <div className="w-1/3">
                                    <img className="h-full w-full object-contain" src={`${BASE_URL}/${ecosystem.ecosystemPicture}`} alt={ecosystem.ecosystemName} />
                                    </div>
                                    <div className="w-2/3">
                                <p className="font-semibold text-gray-800">{ecosystem.ecosystemName}</p>
                                <p className="text-sm text-gray-600">{ecosystem.ecosystemDescription}</p>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>

                    {/* Кнопки */}
                    <div className="flex items-center gap-1 shrink-0">
                        {isEditing ? (
                            <>
                                <button
                                    onClick={handleSave}
                                    disabled={isUpdating}
                                    className="p-1.5 rounded text-white bg-green-500 hover:bg-green-600 transition-colors disabled:opacity-50"
                                >
                                    {isUpdating ? <Loader className="w-4 h-4 animate-spin" /> : <Check className="w-4 h-4" />}
                                </button>
                                <button onClick={handleCancel} className="p-1.5 rounded text-gray-400 hover:bg-gray-200 transition-colors">
                                    <X className="w-4 h-4" />
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="p-1.5 rounded text-gray-300 hover:text-blue-500 hover:bg-blue-50 opacity-0 group-hover:opacity-100 transition-all"
                                >
                                    <Pencil className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => setShowConfirm(true)}
                                    disabled={isDeleting}
                                    className="p-1.5 rounded text-gray-300 hover:text-red-500 hover:bg-red-50 opacity-0 group-hover:opacity-100 transition-all disabled:opacity-50"
                                >
                                    {isDeleting ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <ConfirmDialog
                isOpen={showConfirm}
                title="Удалить экосистему?"
                description={`"${ecosystem.ecosystemName}"`}
                isLoading={isDeleting}
                onConfirm={() => { onDelete(ecosystem.ecosystemId); setShowConfirm(false) }}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    )
}