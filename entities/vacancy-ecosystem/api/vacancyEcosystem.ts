import { api } from "@/shared/api/axiosInctance"
import { CreateEcosystemDto, UpdateEcosystemDto, EcosystemList } from "../model/types"


export const vacancyEcosystem = {
    get: async (): Promise<EcosystemList[]> => {
        const { data } = await api.get(`vacancy/ecosystem/getVacancyCategory`)
        return data
    },

    create: async (dto: CreateEcosystemDto): Promise<void> => {
        await api.post('vacancy/ecosystem/addVacancyCategory', dto)
    },

    update: async (dto: UpdateEcosystemDto): Promise<void> => {
        await api.put('vacancy/ecosystem/editVacancyCategory', dto)
    },

    delete: async (id: number): Promise<void> => {
        await api.delete(`vacancy/ecosystem/deleteVacancyCategory/${id}`)
    },

}