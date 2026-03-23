'use client'

import { Loader } from "lucide-react"
import { QuestionGroup } from "@/entities/vacancy-tests/model/types"

import { QuestionGroupCard } from "./QuestionGroupCard"

interface QuestionsGroupProps {
    items: QuestionGroup[]
    isLoading: boolean
    deletingId: number | undefined
    onDelete: (id: number) => void
    isDeleting: boolean
    onUpdate: (dto: { questionGroupId: number, questionGroupName: string, passingScore: number }) => void
}


export const QuestionsGroup = ({ items, isLoading, onDelete, isDeleting, onUpdate }: QuestionsGroupProps) => {
  if (isLoading) return <Loader className="w-5 h-5 animate-spin text-gray-400" />

  return (
    <div className="grid grid-cols-2 gap-5">
      {items.map((item) => (
        <QuestionGroupCard
          key={item.questionGroupId}  
          item={item}
          onDelete={onDelete}
          isDeleting={isDeleting}
          onUpdate={onUpdate}
        />
      ))}
    </div>
  )
}