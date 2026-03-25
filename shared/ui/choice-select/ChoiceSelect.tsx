import { Picture } from "@/entities/picture"

interface FormState {
    name: string
    description: string
    picture: string
}

export interface SelectProps {
    selected: FormState
    items: Picture[]
    choiceImg: string
    setChoiceImg: (value: string) => void
}

export const ChoiceSelect = ({ items, setChoiceImg, choiceImg }: SelectProps) => {
    return (
        <select
            value={choiceImg}
            onChange={(e) => setChoiceImg(e.target.value)}
            className="w-full p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
            name={choiceImg}
            id={`ecosystem-${choiceImg}`}
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