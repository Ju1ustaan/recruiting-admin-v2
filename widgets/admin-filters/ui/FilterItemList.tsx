import { Loader } from "lucide-react"
import { FilterItem } from "./FilterItem"
import type { VacancySetting } from "@/entities/vacancy-settings"

interface FilterItemListProps {
  items: VacancySetting[]
  isLoading: boolean
  deletingId: number | undefined
  onDelete: (id: number) => void
}

export const FilterItemList = ({ items, isLoading, deletingId, onDelete }: FilterItemListProps) => {
  if (isLoading) return <Loader className="w-5 h-5 animate-spin text-gray-400" />

  return (
    <div className="flex items-center gap-2 flex-wrap">
      {items.map((item) => (
        <FilterItem
          key={item.id}
          label={item.name}
          isDeleting={deletingId === item.id}
          onDelete={() => onDelete(item.id)}
        />
      ))}
    </div>
  )
}