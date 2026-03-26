'use client'

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''

interface Picture {
    pictureId: number
    pictureDescription: string
    pictureName: string
}

interface VacancyPictureSelectProps {
    pictures: Picture[]
    selectedId: number
    onSelect: (id: number) => void
}

export const VacancyPictureSelect = ({ pictures, selectedId, onSelect }: VacancyPictureSelectProps) => {
    const selected = pictures.find(p => p.pictureId === selectedId)

    return (
        <div className="space-y-2">
            <p className="font-semibold text-sm">Выберите изображение</p>

            <select
                value={selectedId}
                onChange={(e) => onSelect(Number(e.target.value))}
                className="w-full p-1.5 text-sm rounded-lg border border-white/50 bg-white/40 backdrop-blur-md outline-blue-400"
            >
                <option value={0}>Выберите картинку...</option>
                {pictures.map((picture) => (
                    <option key={picture.pictureId} value={picture.pictureId}>
                        {picture.pictureDescription}
                    </option>
                ))}
            </select>

        
        </div>
    )
}