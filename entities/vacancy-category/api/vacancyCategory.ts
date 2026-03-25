import { api } from "@/shared/api/axiosInctance"
import { CategoryList, CreateCategoryDto, UpdateCategoryDto } from "../model/types"
// CategoryList, CreateCategoryDto, UpdateCategoryDto

export const vacancyCategory = {
    get: async (): Promise<CategoryList[]> => {
        const { data } = await api.get(`vacancy/category/getAllVacancyCategory`)
        return data
    },

    create: async (dto: CreateCategoryDto): Promise<void> => {
        await api.post('vacancy/category/addVacancyCategory', dto)
    },

    update: async (dto: UpdateCategoryDto): Promise<void> => {
        await api.put('vacancy/category/editVacancyCategory', dto)
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`vacancy/category/deleteVacancyCategoryById/${id}`)
    },

}