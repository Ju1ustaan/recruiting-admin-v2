import { api } from '@/shared/api/axiosInctance'
import { VacancySetting } from '../model/types'
type VacancySettingKeys = keyof VacancySetting
export const vacancySettingsApi = {
  getAll: async (name: string): Promise<VacancySetting[]> => {
    const key = `${name}Id` as VacancySettingKeys
    const { data } = await api.get(`vacancy/settings/${name}`)
    data.map((item: VacancySetting) => {
      item.id = item[key] as number
    })

    
    return data
  },

  create: async (name: string, value: string): Promise<VacancySetting> => {
    const { data } = await api.post(`vacancy/settings/${name}`, { name: value })
    return data
  },

  delete: async (name: string, id: number): Promise<void> => {
    await api.delete(`vacancy/settings/${name}/${id}`)
  },

  update: async (name: string, id: number, value: string): Promise<VacancySetting> => {
    const { data } = await api.put(`vacancy/settings/${name}/${id}`, { name: value })
    return data
  },
}