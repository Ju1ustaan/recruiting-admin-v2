// ─── Ответы ───────────────────────────────────────────
export interface QuestionAnswerPicture {
  questionAnswerPictureId: number
  answerPictureName: string
}

export interface QuestionAnswer {
  answerId: number
  answerText: string
  isTrue: boolean
  questionAnswerPictures: QuestionAnswerPicture[]
}

export interface AnswerDto {
  answerText: string
  isTrue: boolean
}

// ─── Вопросы ──────────────────────────────────────────
export interface Question {
  questionId: number
  questionText: string
  questionAnswers: QuestionAnswer[]
  milliseconds: number
  numbering: number
}

export interface CreateQuestionDto {
  questionText: string
  milliseconds: number
  numbering: number
  questionGroupId: number
}

export interface UpdateQuestionDto {
  questionId: number
  questionText: string
  milliseconds: number
  numbering: number
  questionGroupId: number
}

// ─── Группы вопросов ──────────────────────────────────
export interface QuestionGroup {
  questionGroupId: number
  questionGroupName: string
  passingScore: number
  questions: Question[]
}

export interface CreateQuestionGroupDto {
  questionGroupName: string
  passingScore: number
}

export interface UpdateQuestionGroupDto {
  questionGroupId: number
  questionGroupName: string
  passingScore: number
}

// ─── Bulk ─────────────────────────────────────────────
export interface SaveAllQuestionDto {
  questionGroupId: number
  questionGroupName: string
  passingScore: number
  questionDtos: {
    questionText: string
    answers: AnswerDto[]
    milliseconds: number
    numbering: number
  }[]
}