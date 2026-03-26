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
}

// ─── GET response ─────────────────────────────────────
export interface VacancyItem {
    vacancyId: number
    vacancyName: string
    isActive: boolean
    cvIsActive: boolean
    workSchedule: { workScheduleId: number, name: string }
    salary: { salaryId: number, name: string }
    experience: { experienceId: number, name: string }
    specialization: { specializationId: number, name: string }
    education: { educationId: number, name: string }
    vacancyCategoryId: number       // ← есть в GET
    ecosystemId: number             // ← есть в GET
    region: { regionId: number, name: string }
    advantage: { advantageId: number, name: string }
    questionGroupId: number
    knowledgeGroupId: number
    additionalQuestionGroupId: number
    vacancyPictures: { pictureId: number, pictureName: string, pictureDescription: string } | null
    managerEmails: { managerEmailId: number, email: string }[]
}

export const vacancyApi = {
    getByActive: async (isActive: boolean): Promise<VacancyItem[]> => {
        const { data } = await api.get(`vacancy/findActive/${isActive}`)
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