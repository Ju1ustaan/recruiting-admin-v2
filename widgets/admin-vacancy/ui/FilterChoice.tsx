'use client'

import { useAdminFilters } from "@/widgets/admin-filters"

interface FilterChoiceSingleProps {
    title: string
    name: string
    multiple?: false
    selectedId: number
    onSelect: (id: number) => void
}

interface FilterChoiceMultipleProps {
    title: string
    name: string
    multiple: true
    selectedIds: number[]
    onToggle: (id: number) => void
}

type FilterChoiceProps = FilterChoiceSingleProps | FilterChoiceMultipleProps

export const FilterChoice = (props: FilterChoiceProps) => {
    const { items } = useAdminFilters(props.name)

    

    const isSelected = (id: number): boolean => {
        if (props.multiple) return props.selectedIds.includes(id)
        return props.selectedId === id
    }

    const handleClick = (id: number) => {
        if (props.multiple) props.onToggle(id)
        else props.onSelect(props.selectedId === id ? 0 : id)
    }

    return (
        <div className="space-y-2">
            <p className="font-semibold text-sm">{`Выберите ${props.title}`}</p>
            <div className="flex gap-2 flex-wrap">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => handleClick(item.id)}
                        className={`px-3 py-1.5 text-sm rounded-md border transition-all duration-200
                            ${isSelected(item.id)
                                ? 'bg-blue-500 text-white border-blue-500'
                                : 'bg-white/40 backdrop-blur-md border-white/50 text-gray-600 hover:border-blue-400'
                            }`}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    )
}