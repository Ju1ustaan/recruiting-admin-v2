'use client'

import { useQuery } from "@tanstack/react-query"
import { Loader } from "lucide-react"
import { knowledgeApi } from "@/entities/vacancy-tests"
import { KnowledgeGroupCard } from "./KnowledgeGroupCard"
import { KnowledgeGroupForm } from "./KnowledgeGroupForm"

export const AdminKnowledge = () => {
    const { data: groups = [], isLoading } = useQuery({
        queryKey: ['knowledge-groups'],
        queryFn: () => knowledgeApi.getAll(),
    })

    if (isLoading) return <Loader className="w-5 h-5 animate-spin text-gray-400" />

    return (
        <div className="space-y-4">
            <KnowledgeGroupForm />

            <div className="grid grid-cols-2 gap-5">
                {groups.length === 0 && (
                    <p className="text-sm text-gray-400 text-center py-4 col-span-2">Групп знаний пока нет</p>
                )}
                {groups.map((group) => (
                    <KnowledgeGroupCard key={group.knowledgeGroupId} group={group} />
                ))}
            </div>
        </div>
    )
}