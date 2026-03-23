import { api } from "@/shared/api/axiosInctance"

export interface KnowledgeLevel {
    knowledgeLevelId: number
    knowledgeLevelText: string
}

export interface KnowledgeDto {
    knowledgeId: number
    knowledgeText: string
    knowledgeLevels: KnowledgeLevel[]
}

export interface KnowledgeGroupDto {
    knowledgeGroupId: number
    knowledgeGroupName: string
    knowledge: KnowledgeDto[]
}

export interface KnowledgeGroupShort {
    knowledgeGroupId: number
    knowledgeGroupName: string
}

export const knowledgeApi = {
    saveAll: async (dto: KnowledgeGroupDto[]): Promise<void> => {
        await api.post('vacancy/knowledge/saveKnowledgeGroupAll', dto)
    },

    getAll: async (): Promise<KnowledgeGroupShort[]> => {
        const { data } = await api.get('vacancy/knowledge/getKnowledgeGroupByName')
        return data
    },

    getById: async (knowledgeGroupId: number): Promise<KnowledgeGroupDto> => {
        const { data } = await api.get(`vacancy/knowledge/getKnowledgeGroup/${knowledgeGroupId}`)
        return data
    },


        // ─── POST ─────────────────────────────────────────

    saveGroup: async (knowledgeGroupName: string): Promise<void> => {
        await api.post('vacancy/knowledge/saveKnowledgeGroup', { knowledgeGroupName })
    },

    saveKnowledge: async (knowledgeGroupId: number, knowledgeText: string): Promise<void> => {
        await api.post(`vacancy/knowledge/saveKnowledge/${knowledgeGroupId}`, { knowledgeText })
    },

    saveLevel: async (knowledgeLevelText: string, knowledgeId: number): Promise<void> => {
        await api.post('vacancy/knowledge/saveKnowledgeLevel', { knowledgeLevelText, knowledgeId })
    },

    // ─── PUT ──────────────────────────────────────────
    editGroup: async (dto: { knowledgeGroupId: number, knowledgeGroupName: string }): Promise<void> => {
        await api.put('vacancy/knowledge/editKnowledgeGroup', dto)
    },

    editKnowledge: async (knowledgeGroupId: number, dto: { knowledgeId: number, knowledgeText: string }): Promise<void> => {
        await api.put(`vacancy/knowledge/editKnowledge/${knowledgeGroupId}`, dto)
    },

    editLevel: async (dto: { knowledgeLevelId: number, knowledgeLevelText: string }): Promise<void> => {
        await api.put('vacancy/knowledge/editKnowledgeLevel', dto)
    },

    // ─── DELETE ───────────────────────────────────────
    deleteGroup: async (knowledgeGroupId: number): Promise<void> => {
        await api.delete(`vacancy/knowledge/deleteKnowledgeGroupById/${knowledgeGroupId}`)
    },

    deleteKnowledge: async (knowledgeId: number): Promise<void> => {
        await api.delete(`vacancy/knowledge/deleteKnowledgeById/${knowledgeId}`)
    },

    deleteLevel: async (knowledgeLevelId: number): Promise<void> => {
        await api.delete(`vacancy/knowledge/deleteKnowledgeLevelById/${knowledgeLevelId}`)
    },
}