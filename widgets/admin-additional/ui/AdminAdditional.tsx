'use client'

import { useQuery } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { additionalApi } from "@/entities/vacancy-tests/api/additional"
import { AdditionalGroupCard } from "./AdditionalGroupCard"
import { AdditionalQuestionForm } from "./AdditionalQuestionForm"
import { useAdditionalGroup } from "../model/useAdditionalGroup"

export const AdminAdditional = () => {
    const {isLoading, additionalGroups} = useAdditionalGroup()
    if (isLoading) return <Loader className="w-5 h-5 animate-spin text-gray-400" />

    return (
        <div className="space-y-4">
            <AdditionalQuestionForm />

            <div className="space-y-3 grid grid-cols-2 gap-2">
                {additionalGroups.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4">Групп пока нет</p>
                )}
                {additionalGroups.map((group) => (
                    <AdditionalGroupCard
                        key={group.additionalQuestionGroupId}
                        group={group}
                    />
                ))}
            </div>
        </div>
    )
}