interface GroupItem {
    id: number
    name: string
}

interface VacancyGroupSelectProps {
    title: string
    items: GroupItem[]
    selectedId: number
    onSelect: (id: number) => void
}

export const VacancyGroupSelect = ({ title, items, selectedId, onSelect }: VacancyGroupSelectProps) => {
    return (
        <div className="space-y-1.5">
            <p className="text-sm font-semibold">{title}</p>
            <div className="space-y-1">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(selectedId === item.id ? 0 : item.id)}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-all duration-200
                            ${selectedId === item.id
                                ? 'bg-blue-500/20 border-blue-400 text-blue-700 font-medium'
                                : 'bg-white/40 backdrop-blur-md border-white/50 hover:border-blue-300'
                            }`}
                    >
                        {item.name}
                    </button>
                ))}
            </div>
        </div>
    )
}