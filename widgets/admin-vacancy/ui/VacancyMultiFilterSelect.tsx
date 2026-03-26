interface FilterItem {
    id: number
    name: string
}

interface VacancyMultiFilterSelectProps {
    title: string
    items: FilterItem[]
    selectedIds: number[]
    onToggle: (id: number) => void
}

export const VacancyMultiFilterSelect = ({ title, items, selectedIds, onToggle }: VacancyMultiFilterSelectProps) => {
    return (
        <div className="space-y-1.5">
            <p className="text-sm font-semibold">{title}</p>
            <div className="flex flex-wrap gap-1.5">
                {items.map((item) => {
                    const isSelected = selectedIds.includes(item.id)
                    return (
                        <button
                            key={item.id}
                            onClick={() => onToggle(item.id)}
                            className={`px-3 py-1 rounded-full text-xs font-medium border transition-all duration-200
                                ${isSelected
                                    ? 'bg-blue-500 text-white border-blue-500'
                                    : 'bg-white/40 border-white/50 text-gray-600 hover:border-blue-400'
                                }`}
                        >
                            {item.name}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}