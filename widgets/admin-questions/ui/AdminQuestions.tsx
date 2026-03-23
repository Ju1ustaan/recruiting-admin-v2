'use client'

import { useQuestionsGroup } from "../model/useQuestionsGroup"

import { QuestionsGroup } from "./QuestionsGroup"
import { QuestionGroupForm } from "./QuestionGroupForm"



export const AdminQuestions = () => {


    const { isLoading, items, deleteItem, deletingId, isDeleting, updateItem } = useQuestionsGroup()

    return (
        <div className="space-y-4">

            {/* создать другую форму для создания группы */}
            <QuestionGroupForm />

            <QuestionsGroup
                items={items}
                isLoading={isLoading}
                onDelete={deleteItem}
                deletingId={deletingId}
                isDeleting={isDeleting}
                onUpdate={updateItem}
            />
        </div>
    )
}