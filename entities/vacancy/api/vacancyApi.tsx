import { api } from "@/shared/api/axiosInctance"

// ─── POST ─────────────────────────────────────────────
export interface CreateVacancyDto {
    vacancyName: string
    isActive: boolean
    cvIsActive: boolean
    workScheduleId: number
    salaryId: number
    experienceId: number
    specializationId: number
    educationId: number
    advantageId: number
    vacancyCategoryId: number
    ecosystemId: number
    regionId: number
    questionGroupId: number
    knowledgeGroupId: number
    additionalQuestionGroupId: number
    vacancyPicturesId: number
    managerEmails: { email: string }[]
}

// ─── PUT ──────────────────────────────────────────────
export interface UpdateVacancyDto {
    vacancyId: number
    vacancyName: string
    isActive: boolean
    cvIsActive: boolean
    workScheduleId: number | null
    salaryId: number | null
    experienceId: number | null
    specializationId: number | null
    educationId: number | null
    advantageId: number | null
    vacancyCategoryId: number | null
    ecosystemId: number | null
    regionId: number | null
    questionGroupId: number | null
    knowledgeGroupId: number | null
    additionalQuestionGroupId: number | null
    vacancyPicturesId: number | null
}

// ─── GET response ─────────────────────────────────────
export interface VacancyItem {
    vacancyId: number
    vacancyName: string
    isActive: boolean
    cvIsActive: boolean
    workSchedule: { workScheduleId: number, name: string } | null
    salary: { salaryId: number, name: string } | null
    experience: { experienceId: number, name: string } | null
    specialization: { specializationId: number, name: string } | null
    education: { educationId: number, name: string } | null
    vacancyCategoryId: number | null
    ecosystemId: number | null
    region: { regionId: number, name: string } | null
    advantage: { advantageId: number, name: string } | null
    questionGroupId: number | null
    knowledgeGroupId: number | null
    additionalQuestionGroupId: number | null
    vacancyPictures: { pictureId: number, pictureName: string, pictureDescription: string } | null
    managerEmails: { managerEmailId: number, email: string }[]
}

export const vacancyApi = {
    getByActive: async (isActive: boolean): Promise<VacancyItem[]> => {
        const { data } = await api.get(`vacancy/findActive/${isActive}`)
        return data
    },

    getById: async (id: number): Promise<VacancyItem> => {
        const {data} = await api.get(`vacancy/findVacancyById/${id}`)
        return data
    },
    create: async (dto: CreateVacancyDto): Promise<void> => {
        await api.post('vacancy/addNewVacancy', dto)
    },
    update: async (dto: UpdateVacancyDto): Promise<void> => {
        await api.put('vacancy/editVacancy', dto)
    },
    delete: async (vacancyId: number): Promise<void> => {
        await api.delete(`vacancy/deleteVacancyById/${vacancyId}`)
    },
}