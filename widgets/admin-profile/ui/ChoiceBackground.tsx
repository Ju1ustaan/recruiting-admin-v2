'use client'

import { Check } from "lucide-react"

interface ChoiceBackgroundProps {
    backgrounds: string[]
    selected: string
    onChange: (url: string) => void
}

export const ChoiceBackground = ({ backgrounds, selected, onChange }: ChoiceBackgroundProps) => {
    return (
        <div>
            <p className="text-sm font-semibold text-gray-600 mb-3">Фон панели</p>
            <div className="flex flex-wrap gap-3">
                {backgrounds.map((bg) => (
                    <button
                        key={bg}
                        onClick={() => onChange(bg)}
                        className="relative w-72 h-44 rounded-lg overflow-hidden border-2 transition-all duration-200
                            hover:scale-105 hover:shadow-md"
                        style={{
                            borderColor: selected === bg ? '#3b82f6' : 'transparent',
                            backgroundImage: `url(${bg})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                        }}
                    >
                        {selected === bg && (
                            <div className="absolute inset-0 flex items-center justify-center bg-blue-500/30">
                                <Check className="w-4 h-4 text-white drop-shadow" />
                            </div>
                        )}
                    </button>
                ))}
            </div>
        </div>
    )
}