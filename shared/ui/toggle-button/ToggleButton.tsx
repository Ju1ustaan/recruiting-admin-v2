interface ToggleButtonProps {
    label: string
    value: boolean
    onChange: (value: boolean) => void
}

export const ToggleButton = ({ label, value, onChange }: ToggleButtonProps) => {
    return (
        <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-sm">{label}</p>
            <div className="flex gap-2">
                <button
                    onClick={() => onChange(true)}
                    className={`flex-1 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200
                        ${value
                            ? 'bg-green-500 text-white border-green-500'
                            : 'bg-white/40 border-white/50 text-gray-500 hover:border-green-400'
                        }`}
                >
                    Да
                </button>
                <button
                    onClick={() => onChange(false)}
                    className={`flex-1 py-1.5 rounded-lg text-sm font-medium border transition-all duration-200
                        ${!value
                            ? 'bg-red-400 text-white border-red-400'
                            : 'bg-white/40 border-white/50 text-gray-500 hover:border-red-400'
                        }`}
                >
                    Нет
                </button>
            </div>
        </div>
    )
}