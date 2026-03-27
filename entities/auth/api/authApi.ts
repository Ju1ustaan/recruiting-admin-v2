import { api } from "@/shared/api/axiosInctance"

export interface LoginDto {
    userName: string
    password: string
}

export interface RegisterDto {
    userName: string
    password: string
    email: string
}

export const authApi = {
    login: async (dto: LoginDto): Promise<string> => {
        const { data } = await api.post('login', dto)
        return data // токен
    },

    register: async (dto: RegisterDto): Promise<void> => {
        await api.post('admin/user/saveUser', dto)
    },

    sendPassword: async (userName: string): Promise<string> => {
        const { data } = await api.post(`admin/user/sendPass/${userName}`)
        return data
    },
}