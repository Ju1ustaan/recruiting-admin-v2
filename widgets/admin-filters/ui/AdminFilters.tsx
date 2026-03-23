'use client'

import { useState } from "react"
import { FilterHeader } from "./FilterHeader"
import { FilterInput } from "./FilterInput"
import { FilterItemList } from "./FilterItemList"
import { useAdminFilters } from "../model/useAdminFilters"

export const AdminFilters = ({ title, name }: { title: string, name: string }) => {
  const [isOpen, setIsOpen] = useState(false)
  const {
    items,
    isLoading,
    inputValue,
    setInputValue,
    handleCreate,
    isCreating,
    deleteItem,
    deletingId,
  } = useAdminFilters(name)
  
  return (
    <div>
      <FilterHeader
        title={title}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
      />
      <div className={`overflow-hidden transition-all duration-200 p-1 ease-in-out
        ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <FilterInput
          value={inputValue}
          onChange={setInputValue}
          onSubmit={handleCreate}
          isLoading={isCreating}
        />
        <FilterItemList
          items={items}
          isLoading={isLoading}
          deletingId={deletingId}
          onDelete={deleteItem}
        />
      </div>
    </div>
  )
}