import { Picture } from "@/entities/picture"
import { Ecosystem } from "@/entities/vacancy-ecosystem"

export interface SelectProps {
    selected: Ecosystem
    items: Picture[]
    choiceImg: string
    setChoiceImg: (value: string) => void
}

export const ChoiceSelect = ({ selected, items, setChoiceImg, choiceImg }: SelectProps) => {
    return (
        <select
            value={choiceImg}
            onChange={(e) => setChoiceImg(e.target.value)}
            className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
            name={selected.ecosystemName}
            id={`ecosystem-${selected.ecosystemName}`}
        >
            <option value="">Выберите картинку</option>
            {items.map((item) => (
                <option key={item.pictureId} value={item.pictureName}>
                    {item.pictureDescription}
                </option>
            ))}
        </select>
    )
}