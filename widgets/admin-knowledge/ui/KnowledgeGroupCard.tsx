'use client'

import { useState } from "react"
import { Loader, PlusCircle } from "lucide-react"
import { KnowledgeGroupShort } from "@/entities/vacancy-tests"
import { ConfirmDialog } from "@/shared/confirm-dialog"
// import { QuestionGroupHeader } from "@/widgets/admin-questions/ui/QuestionGroupHeader"
import { useKnowledgeList } from "../model/useKnowledgeList"
import { KnowledgeItem } from "./KnowledgeItem"

export const KnowledgeGroupCard = ({ group }: { group: KnowledgeGroupShort }) => {
    const {
        knowledge, isLoading,
        updateGroup, deleteGroup, isDeletingGroup,
        createKnowledge, isCreating,
        updateKnowledge, isUpdatingKnowledge,
        deleteKnowledge, deletingKnowledgeId, isDeletingKnowledge,
    } = useKnowledgeList(group.knowledgeGroupId)

    const [isOpen, setIsOpen] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [newKnowledgeText, setNewKnowledgeText] = useState('')

    const handleCreateKnowledge = () => {
        if (!newKnowledgeText.trim()) return
        createKnowledge(newKnowledgeText.trim(), {
            onSuccess: () => setNewKnowledgeText('')
        })
    }

    return (
        <>
            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {/* <QuestionGroupHeader
                    label={group.knowledgeGroupName}
                    isOpen={isOpen}
                    onToggle={() => setIsOpen(!isOpen)}
                    onUpdate={updateGroup} 
                    onDelete={() => setShowConfirm(true)}
                    isDeleting={isDeletingGroup}
                /> */}

                {isOpen && (
                    <div className="p-4 space-y-2">
                        {isLoading ? (
                            <Loader className="w-5 h-5 animate-spin text-gray-400 mx-auto" />
                        ) : (
                            <>
                                {knowledge.length === 0 && (
                                    <p className="text-sm text-gray-400 text-center py-2">Знаний пока нет</p>
                                )}

                                {knowledge.map((item) => (
                                    <KnowledgeItem
                                        key={item.knowledgeId}
                                        knowledge={item}
                                        knowledgeGroupId={group.knowledgeGroupId}
                                        isDeleting={isDeletingKnowledge && deletingKnowledgeId === item.knowledgeId}
                                        isUpdating={isUpdatingKnowledge}
                                        onUpdate={updateKnowledge}
                                        onDelete={deleteKnowledge}
                                    />
                                ))}

                                {/* Добавить знание */}
                                <div className="flex items-center gap-2 pt-1">
                                    <input
                                        type="text"
                                        placeholder="Новое знание..."
                                        value={newKnowledgeText}
                                        onChange={(e) => setNewKnowledgeText(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleCreateKnowledge()}
                                        className="flex-1 p-1.5 text-sm rounded-lg border border-gray-300 outline-blue-400"
                                    />
                                    <button
                                        onClick={handleCreateKnowledge}
                                        disabled={isCreating || !newKnowledgeText.trim()}
                                        className="py-1.5 px-3 bg-gray-400 rounded-lg flex items-center gap-1.5 text-white text-sm
                                            hover:bg-green-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isCreating ? <Loader className="w-4 h-4 animate-spin" /> : <><PlusCircle className="w-4 h-4" />Добавить</>}
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>

            <ConfirmDialog
                isOpen={showConfirm}
                title="Удалить группу знаний?"
                description={`"${group.knowledgeGroupName}" и все вложенные знания будут удалены`}
                isLoading={isDeletingGroup}
                onConfirm={() => { deleteGroup(); setShowConfirm(false) }}
                onCancel={() => setShowConfirm(false)}
            />
        </>
    )
}