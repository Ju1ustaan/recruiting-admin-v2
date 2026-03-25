'use client'

import { Loader } from "lucide-react"
import { usePicture } from "../model/usePicture"
import { PictureItem } from "./PictureItem"
import { AddPicture } from "./AddPicture"



export const PictureList = () => {
    const {
        pictures, isLoading,
        deletePicture, deletingId, isDeleting,
        // форма
        preview, description, setDescription,
        handleFile, savePicture, isSaving, isValid, reset,
    } = usePicture()

    return (
        <div className="space-y-5">
            {/* Список */}
            {isLoading ? (
                <div className="flex justify-center py-8">
                    <Loader className="w-6 h-6 animate-spin text-gray-400" />
                </div>
            ) : pictures.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-8">Картинок пока нет</p>
            ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {/* Форма добавления */}
                    <AddPicture
                        preview={preview}
                        description={description}
                        setDescription={setDescription}
                        handleFile={handleFile}
                        onSave={() => savePicture()}
                        isSaving={isSaving}
                        isValid={isValid}
                        onReset={reset}
                    />
                    {pictures.map((picture) => (
                        <PictureItem
                            key={picture.pictureId}
                            picture={picture}
                            isDeleting={isDeleting && deletingId?.id === picture.pictureId}
                            onDelete={(id, pictureName) => deletePicture({ id, pictureName })}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}