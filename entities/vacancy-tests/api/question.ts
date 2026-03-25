import { api } from "@/shared/api/axiosInctance"
import {
  QuestionGroup,
  Question,
  CreateQuestionDto,
  UpdateQuestionDto,
  SaveAllQuestionDto,
  CreateQuestionGroupDto,
  UpdateQuestionGroupDto,
} from "../model/types"

// ─── Группы вопросов ──────────────────────────────────
export const questionGroupApi = {

  getAll: async (): Promise<QuestionGroup[]> => {
    const { data } = await api.get(`vacancy/question/getOnlyQuestionGroupName`)
    return data
  },

  create: async (dto: CreateQuestionGroupDto): Promise<QuestionGroup> => {
    const { data } = await api.post(`vacancy/question/saveQuestionGroup`, dto)
    return data
  },

  update: async (dto: UpdateQuestionGroupDto): Promise<void> => {
    await api.put(`vacancy/question/editQuestionGroup`, null, { params: dto })
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`vacancy/question/deleteQuestionGroup/${id}`)
  },

}

// ─── Вопросы ──────────────────────────────────────────
export const questionApi = {

  getByGroupId: async (questionGroupId: number): Promise<QuestionGroup> => {
    const { data } = await api.get(`vacancy/question/getQuestionGroup/${questionGroupId}`)
    return data
  },

  create: async (dto: CreateQuestionDto): Promise<Question> => {
    const { data } = await api.post(`vacancy/question/saveQuestion`, dto)
    return data
  },

  update: async (dto: UpdateQuestionDto): Promise<Question> => {
    const { data } = await api.put(`vacancy/question/editQuestion`, null, { params: dto })
    return data
  },

  delete: async (questionId: number): Promise<void> => {
    await api.delete(`vacancy/question/deleteQuestion/${questionId}`)
  },

  saveAll: async (dto: SaveAllQuestionDto[]): Promise<void> => {
    await api.post(`vacancy/question/saveAllQuestion`, dto)
  },

}


// ─── Ответы ───────────────────────────────────────────
export const questionAnswerApi = {

  create: async (dto: { answerText: string, isTrue: boolean, questionId: number }): Promise<void> => {
    await api.post(`vacancy/question/saveQuestionAnswer`, dto)
  },

  update: async (dto: { answerId: number, answerText: string, isTrue: boolean, questionId: number }): Promise<void> => {
    await api.put(`vacancy/question/editQuestionAnswer`, dto)
  },

  delete: async (questionAnswerId: number): Promise<void> => {
    await api.delete(`vacancy/question/deleteQuestionAnswer/${questionAnswerId}`)
  },
savePicture: async (questionAnswerId: number, picture: string): Promise<void> => {
    await api.post('vacancy/question/saveQuestionAnswerPicture',
        { picture },
        { params: { questionAnswerId } }
    )
},
}