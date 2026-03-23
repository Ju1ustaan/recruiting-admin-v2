import { api } from "@/shared/api/axiosInctance"
import { CreateEcosystemDto, UpdateEcosystemDto } from "../model/types"


export const vacancyEcosystem = {

    create: async (dto: CreateEcosystemDto): Promise<void> => {
        await api.post('vacancy/ecosystem/addVacancyCategory', dto)
    },

    update: async (dto: UpdateEcosystemDto): Promise<void> => {
        await api.put('vacancy/ecosystem/editVacancyCategory', dto)
    },

    delete: async (ecosystemId: number): Promise<void> => {
        await api.delete(`vacancy/ecosystem/deleteVacancyCategory/${ecosystemId}`)
    },

}