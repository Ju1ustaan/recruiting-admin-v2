
export interface EcosystemList {
    ecosystemId: number
    ecosystemName: string
    ecosystemPicture: string
    ecosystemDescription: string
}

export interface CreateEcosystemDto {
    ecosystemId: number
    ecosystemName: string
    ecosystemPictureName: string
    ecosystemDescription: string
}

export interface UpdateEcosystemDto {
    ecosystemId: number
    ecosystemName: string
    ecosystemPictureName: string
    ecosystemDescription: string
}