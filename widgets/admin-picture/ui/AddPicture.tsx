'use client'

import { useRef, useState } from "react"
import { Upload, X, Loader, ImageIcon } from "lucide-react"
import { usePicture } from "../model/usePicture"

interface AddPictureProps {
    preview: string | null
    description: string
    setDescription: (v: string) => void
    handleFile: (f: File | undefined) => void
    onSave: () => void
    isSaving: boolean
    isValid: boolean
    onReset: () => void
}

export const AddPicture = ({
    preview, description, setDescription,
    handleFile, onSave, isSaving, isValid, onReset
}: AddPictureProps) => {
    const inputRef = useRef<HTMLInputElement>(null)
    const [isDragging, setIsDragging] = useState(false)

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(false)
        handleFile(e.dataTransfer.files[0])
    }

    const onDragOver = (e: React.DragEvent) => {
        e.preventDefault()
        setIsDragging(true)
    }

    return (
        <div className="space-y-4 p-4 bg-white/40 backdrop-blur-md border border-white/50 rounded-xl shadow-sm">
            <p className="text-sm font-semibold text-gray-600">Добавить картинку</p>

            {/* Зона загрузки */}
            {!preview ? (
                <div
                    onClick={() => inputRef.current?.click()}
                    onDrop={onDrop}
                    onDragOver={onDragOver}
                    onDragLeave={() => setIsDragging(false)}
                    className={`flex flex-col items-center justify-center gap-2 h-72 rounded-xl border-2 border-dashed 
                        cursor-pointer transition-all duration-200
                        ${isDragging
                            ? 'border-blue-400 bg-blue-50/60 scale-[1.01]'
                            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50/30'
                        }`}
                >
                    <ImageIcon className="w-8 h-8 text-gray-300" />
                    <p className="text-sm text-gray-400">Перетащите или <span className="text-blue-500">выберите файл</span></p>
                    <p className="text-xs text-gray-300">jpg, jpeg, png, webp</p>

                    <input
                        ref={inputRef}
                        type="file"
                        accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                        className="hidden"
                        onChange={(e) => handleFile(e.target.files?.[0])}
                    />
                </div>
            ) : (
                // Превью
                <div className="relative w-full h-72 rounded-xl overflow-hidden group">
                    <img src={preview} alt="preview" className="w-full h-full object-cover" />
                    <button
                        onClick={onReset}
                        className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white
                            opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            )}

            {/* Описание */}
            <div>
                <label className="text-xs text-gray-500 mb-1 block">Описание (picture_description)</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Например: mbank-logo"
                    className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                />
            </div>

            {/* Кнопка */}
            <button
                onClick={onSave}
                disabled={!isValid || isSaving}
                className="w-full py-2 rounded-lg bg-blue-500 text-white text-sm flex items-center justify-center gap-2
                    hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
                {isSaving
                    ? <><Loader className="w-4 h-4 animate-spin" />Сохранение...</>
                    : <><Upload className="w-4 h-4" />Сохранить</>
                }
            </button>
        </div>
    )
}