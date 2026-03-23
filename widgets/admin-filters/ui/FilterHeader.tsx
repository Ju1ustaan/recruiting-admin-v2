import { ChevronDown } from 'lucide-react'

interface FilterHeaderProps {
  title: string
  isOpen: boolean
  onToggle: () => void
}

export const FilterHeader = ({ title, isOpen, onToggle }: FilterHeaderProps) => {
    return (
        <button className="cursor-pointer text-sm font-bold mb-3 text-gray-800" onClick={onToggle}>
            {title}
            <ChevronDown className={`w-4 h-4 inline-block ml-1 transition-all duration-300 ${isOpen ? '' : '-rotate-90'}`} />
        </button>
    )
}
