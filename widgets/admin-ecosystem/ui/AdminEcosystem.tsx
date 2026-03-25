'use client'

import { Loader } from "lucide-react"
import { useEcosystem } from "../model/useEcosystem"
import { EcosystemForm } from "./EcosystemForm"
import { EcosystemItem } from "./EcosystemItem"
import { usePicture } from "@/widgets/admin-picture/model/usePicture"

export const AdminEcosystem = () => {
    const {
        ecosystems, isLoading,
        createEcosystem, isCreating,
        updateEcosystem, isUpdating,
        deleteEcosystem, deletingId, isDeleting,
    } = useEcosystem()
    const { pictures } = usePicture()

    return (
        <div className="space-y-5">
            <EcosystemForm pictures={pictures}/>

            {isLoading ? (
                <div className="flex justify-center py-6">
                    <Loader className="w-5 h-5 animate-spin text-gray-400" />
                </div>
            ) : ecosystems.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Экосистем пока нет</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ecosystems.map((ecosystem) => (
                        <EcosystemItem
                            pictures={pictures}
                            key={ecosystem.ecosystemId}
                            ecosystem={ecosystem}
                            isDeleting={isDeleting && deletingId === ecosystem.ecosystemId}
                            isUpdating={isUpdating}
                            onUpdate={updateEcosystem}
                            onDelete={deleteEcosystem}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}