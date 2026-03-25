'use client'

import { useState } from "react"
import { Trash2, Loader, Copy, Check } from "lucide-react"
import { Picture } from "@/entities/picture"
import { ConfirmDialog } from "@/shared/confirm-dialog"

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''

interface PictureItemProps {
    picture: Picture
    isDeleting: boolean
    onDelete: (id: number, pictureName: string) => void
}

export const PictureItem = ({ picture, isDeleting, onDelete }: PictureItemProps) => {
    const [showConfirm, setShowConfirm] = useState(false)
    const [copied, setCopied] = useState(false)

    const imageUrl = `${BASE_URL}/${picture.pictureName}`

    const handleCopy = () => {
        navigator.clipboard.writeText(picture.pictureName)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <>
            <div className="group relative rounded-xl overflow-hidden border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all duration-200">

                {/* Картинка */}
                <div className="relative bg-gray-100 overflow-hidden">
                    <img
                        src={imageUrl}
                        alt={picture.pictureDescription}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />

                    {/* Оверлей при наведении */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-2">
                        {/* Копировать название */}
                        <button
                            onClick={handleCopy}
                            className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition-colors"
                            title="Копировать название"
                        >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </button>

                        {/* Удалить */}
                        <button
                            onClick={() => setShowConfirm(true)}
                            disabled={isDeleting}
                            className="p-2 rounded-full bg-red-500/70 hover:bg-red-500 text-white transition-colors disabled:opacity-50"
                            title="Удалить"
                        >
                            {isDeleting
                                ? <Loader className="w-4 h-4 animate-spin" />
                                : <Trash2 className="w-4 h-4" />
                            }
                        </button>
                    </div>
                </div>

                {/* Инфо */}
                <div className="p-2">
                    <p className="text-xs font-medium text-gray-700 truncate">{picture.pictureDescription}</p>
                    <p className="text-xs text-gray-400 truncate">{picture.pictureName}</p>
                </div>
            </div>

            <ConfirmDialog
                isOpen={showConfirm}
                title="Удалить картинку?"
                description={`"${picture.pictureDescription}"`}
                isLoading={isDeleting}
                onConfirm={() => { onDelete(picture.pictureId, picture.pictureName); setShowConfirm(false) }}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    )
}