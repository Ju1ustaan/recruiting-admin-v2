interface Item {
    id: number
    name: string
    description?: string
    picture?: string
}

interface VacancySelectCardProps {
    title: string
    items: Item[]
    selectedId: number
    onSelect: (id: number) => void
}

const BASE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL ?? ''

export const VacancySelectCard = ({ title, items, selectedId, onSelect }: VacancySelectCardProps) => {
    return (
        <div className="space-y-2">
            <p className="font-semibold text-sm">{title}</p>
            <div className="max-h-48 overflow-y-auto space-y-1.5 pr-1">
                {items.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => onSelect(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg border text-left transition-all duration-200
                            ${selectedId === item.id
                                ? 'bg-blue-500/20 border-blue-400 text-blue-700'
                                : 'bg-white/40 backdrop-blur-md border-white/50 hover:border-blue-300'
                            }`}
                    >
                        {item.picture && (
                            <div className="w-8 h-8 shrink-0 overflow-hidden rounded">
                                <img src={`${BASE_URL}/${item.picture}`} alt={item.name} className="w-full h-full object-contain" />
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium truncate">{item.name}</p>
                            {item.description && <p className="text-xs text-gray-400 truncate">{item.description}</p>}
                        </div>
                        {selectedId === item.id && (
                            <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0" />
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}