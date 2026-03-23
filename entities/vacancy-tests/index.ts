export type {
  QuestionGroup,
  Question,
  QuestionAnswer,
  QuestionAnswerPicture,
  AnswerDto,
  CreateQuestionDto,
  UpdateQuestionDto,
  CreateQuestionGroupDto,
  UpdateQuestionGroupDto,
  SaveAllQuestionDto,
} from "./model/types"

export { questionApi, questionGroupApi, questionAnswerApi } from "./api/question"

export type { KnowledgeDto, KnowledgeGroupDto, KnowledgeLevel, KnowledgeGroupShort } from "./api/knowledge"
export { knowledgeApi } from "./api/knowledge"