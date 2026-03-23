import { Loader, PlusCircle } from "lucide-react"

interface FilterInputProps {
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isLoading: boolean
}

export const FilterInput = ({ value, onChange, onSubmit, isLoading }: FilterInputProps) => {
  return (
    <div className="flex items-center gap-2 mb-3 text-sm">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && onSubmit()}
        className="p-1 rounded-lg outline-1"
      />
      <button
        onClick={onSubmit}
        disabled={isLoading}
        className="py-1 px-5 bg-gray-400 rounded-lg flex items-center gap-2 text-white hover:bg-green-500 duration-300 disabled:opacity-50"
      >
        {isLoading
          ? <Loader className="w-5 h-5 animate-spin" />
          : <><p>Добавить</p><PlusCircle className="w-5 h-5" /></>
        }
      </button>
    </div>
  )
}