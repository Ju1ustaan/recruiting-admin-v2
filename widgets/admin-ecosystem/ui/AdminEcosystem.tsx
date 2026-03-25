'use client'

import { Loader } from "lucide-react"
import { useEcosystem } from "../model/useEcosystem"
import { EcosystemForm } from "./EcosystemForm"
import { EcosystemItem } from "./EcosystemItem"
import { usePicture } from "@/widgets/admin-picture/model/usePicture"
import { CreateEcosystemDto } from "@/entities/vacancy-ecosystem"
import { EcosystemList, UpdateEcosystemDto } from "@/entities/vacancy-ecosystem"

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
            <EcosystemForm<CreateEcosystemDto>
                pictures={pictures}
                title="Добавить экосистему"
                create={createEcosystem}
                mapToDto={(form, img) => ({
                    ecosystemId: 0,
                    ecosystemName: form.ecosystemName.trim(),
                    ecosystemPictureName: img.trim(),
                    ecosystemDescription: form.ecosystemDescription.trim(),
                })}
            />
            {isLoading ? (
                <div className="flex justify-center py-6">
                    <Loader className="w-5 h-5 animate-spin text-gray-400" />
                </div>
            ) : ecosystems.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Экосистем пока нет</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {ecosystems.map((ecosystem) => (
                        <EcosystemItem<EcosystemList, UpdateEcosystemDto>
                            item={ecosystem}
                            isDeleting={isDeleting}
                            isUpdating={isUpdating}
                            onUpdate={updateEcosystem}
                            onDelete={deleteEcosystem}
                            pictures={pictures}

                            getId={(e) => e.ecosystemId}

                            mapToForm={(e) => ({
                                name: e.ecosystemName,
                                description: e.ecosystemDescription,
                                picture: e.ecosystemPicture,
                            })}

                            mapToDto={(form, img, e) => ({
                                ecosystemId: e.ecosystemId,
                                ecosystemName: form.name,
                                ecosystemPictureName: img || form.picture,
                                ecosystemDescription: form.description,
                            })}

                            renderTitle={(e) => e.ecosystemName}
                            renderDescription={(e) => e.ecosystemDescription}
                            renderImage={(e) => e.ecosystemPicture}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}