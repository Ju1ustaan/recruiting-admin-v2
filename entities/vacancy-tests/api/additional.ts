import { api } from "@/shared/api/axiosInctance"

// ─── Типы ─────────────────────────────────────────────
export type QuestionType = 'TEST' | 'ESSAY'

export interface AdditionalQuestionDto {
    questionType: QuestionType
    numbering: number
    additionalQuestion: string
    milliseconds: number
    essayLength: number
}

export interface AdditionalGroupDto {
    additionalQuestionGroupName: string
    additionalQuestionDtoList: AdditionalQuestionDto[]
}

export interface AdditionalQuestion {
    additionalQuestionId: number
    questionType: QuestionType
    numbering: number
    additionalQuestion: string
    milliseconds: number
    essayLength: number
}

export interface AdditionalGroupShort {
    additionalQuestionGroupId: number
    additionalQuestionGroupName: string
}

export interface AdditionalGroup {
    additionalQuestionGroupId: number
    additionalQuestionGroupName: string
    additionalQuestions: AdditionalQuestion[]
}

export interface CreateAdditionalQuestionDto {
    questionType: QuestionType
    numbering: number
    additionalQuestion: string
    milliseconds: number
    essayLength: number
    additionalQuestionGroupId: number
}

export interface UpdateAdditionalQuestionDto {
    additionalQuestionId: number
    questionType: QuestionType
    numbering: number
    additionalQuestion: string
    milliseconds: number
    essayLength: number
    additionalQuestionGroupId: number
}

export interface UpdateAdditionalGroupDto {
    additionalQuestionGroupId: number
    additionalQuestionGroupName: string
}

// ─── API ──────────────────────────────────────────────
export const additionalApi = {

    // ─── GET ──────────────────────────────────────────
    getAll: async (): Promise<AdditionalGroupShort[]> => {
        const { data } = await api.get('vacancy/additional/getAdditionalGroupQuestion')
        return data
    },

    getById: async (id: number): Promise<AdditionalGroup> => {
        const { data } = await api.get(`vacancy/additional/getAdditionalGroupQuestionById/${id}`)
        return data
    },

    // ─── POST ─────────────────────────────────────────
    saveAll: async (dto: AdditionalGroupDto[]): Promise<void> => {
        await api.post('vacancy/additional/addAllAdditionalGroupQuestion', dto)
    },

    createGroup: async (additionalQuestionGroupName: string): Promise<void> => {
        await api.post('vacancy/additional/addAdditionalGroupQuestion', { additionalQuestionGroupName })
    },

    createQuestion: async (dto: CreateAdditionalQuestionDto): Promise<void> => {
        await api.post('vacancy/additional/addAdditionalQuestion', dto)
    },

    // ─── PUT ──────────────────────────────────────────
    updateGroup: async (dto: UpdateAdditionalGroupDto): Promise<void> => {
        await api.put('vacancy/additional/editAdditionalGroupQuestion', dto)
    },

    updateQuestion: async (dto: UpdateAdditionalQuestionDto): Promise<void> => {
        await api.put('vacancy/additional/editAdditionalQuestion', dto)
    },

    // ─── DELETE ───────────────────────────────────────
    deleteGroup: async (additionalQuestionGroupId: number): Promise<void> => {
        await api.delete(`vacancy/additional/deleteAdditionalGroupQuestion/${additionalQuestionGroupId}`)
    },

    deleteQuestion: async (additionalQuestionId: number): Promise<void> => {
        await api.delete(`vacancy/additional/deleteAdditionalQuestion/${additionalQuestionId}`)
    },
}