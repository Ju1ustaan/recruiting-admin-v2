import { api } from "@/shared/api/axiosInctance"

import { Picture } from "../model/types"

export const pictureApi = {
    save: async (picture_description: string, file: File): Promise<void> => {
        const formData = new FormData()
        formData.append('picture', file)
        await api.post('vacancy/pictures/savePicture', formData, {
            params: { picture_description },
            headers: { 'Content-Type': 'multipart/form-data' },
        })
    },

    getAll: async (): Promise<Picture[]> => {
        const { data } = await api.get('vacancy/pictures/getAllVacancyPicture')
        return data
    },

    delete: async (id: number, pictureName: string): Promise<void> => {
        await api.delete('vacancy/pictures/deleteVacancyPicture', {
            params: { id, pictureName },
        })
    },
}