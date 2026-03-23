'use client'

import { useState } from "react"
import { QuestionGroupHeader } from "./QuestionGroupHeader"
import { QuestionGroup } from "@/entities/vacancy-tests/model/types"
import { QuestionList } from "./QuestionList"

export const QuestionGroupCard = ({ item, onDelete, isDeleting, onUpdate }: { item: QuestionGroup, onDelete: (id: number) => void, isDeleting: boolean, onUpdate: (dto: { questionGroupId: number, questionGroupName: string, passingScore: number }) => void }) => {
  const [isOpen, setIsOpen] = useState(false) 
  return (
    <div className="rounded ">
      <QuestionGroupHeader
        label={item.questionGroupName}
        passingScore={item.passingScore}
        id={item.questionGroupId}
        onDelete={() => onDelete(item.questionGroupId)}
        isOpen={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        isDeleting={isDeleting}
        onUpdate={onUpdate}
      />
      <div className={`bg-blue-100 overflow-hidden transition-all duration-200 p-2 rounded-b-lg ease-in-out
        ${isOpen ? 'min-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <QuestionList questionGroupId={item.questionGroupId} />
      </div>
    </div>
  )
}