'use client'

import { Loader } from "lucide-react"
import { EcosystemForm, EcosystemItem } from "@/widgets/admin-ecosystem"
import { usePicture } from "@/widgets/admin-picture/model/usePicture"
import { useCategory } from "../model/useCategory"
import { CreateCategoryDto } from "@/entities/vacancy-category"
import { CategoryList, UpdateCategoryDto } from "@/entities/vacancy-category"

export const AdminCategory = () => {
    const {
        createCategory,
        isCreating,
        updateCategory,
        isUpdating,
        deleteCategory,
        deletingId,
        isDeleting,
        category,
        isLoading,
    } = useCategory()
    const { pictures } = usePicture()
    return (
        <div className="space-y-5">
            <EcosystemForm<CreateCategoryDto>
                pictures={pictures}
                title="Добавить категорию"
                create={createCategory}
                mapToDto={(form, img) => ({
                    vacancyCategoryName: form.ecosystemName.trim(),
                    vacancyCategoryPictureName: img.trim(),
                    vacancyCategoryDescription: form.ecosystemDescription.trim(),
                })}
            />
            {isLoading ? (
                <div className="flex justify-center py-6">
                    <Loader className="w-5 h-5 animate-spin text-gray-400" />
                </div>
            ) : category.length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-6">Экосистем пока нет</p>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {category.map((categ) => (
                        <EcosystemItem<CategoryList, UpdateCategoryDto>
                            item={categ}
                            isDeleting={isDeleting}
                            isUpdating={isUpdating}
                            onUpdate={updateCategory}
                            onDelete={deleteCategory}
                            pictures={pictures}

                        getId = {(c) => c.vacancyCategoryId}

                    mapToForm={(c) => ({
                        name: c.vacancyCategoryName,
                        description: c.vacancyCategoryDescription,
                        picture: c.vacancyCategoryPicture,
                    })}

                    mapToDto={(form, img, c) => ({
                        vacancyCategoryId: c.vacancyCategoryId,
                        vacancyCategoryName: form.name,
                        vacancyCategoryPictureName: img || form.picture,
                        vacancyCategoryDescription: form.description,
                    })}

                    renderTitle={(c) => c.vacancyCategoryName}
                    renderDescription={(c) => c.vacancyCategoryDescription}
                    renderImage={(c) => c.vacancyCategoryPicture}
/>
                            ))}
                </div>
            )}
        </div>
    )
}

