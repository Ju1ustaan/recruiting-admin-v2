
// for get
export interface CategoryList {
    vacancyCategoryId: number
    vacancyCategoryName: string
    vacancyCategoryPicture: string
    vacancyCategoryDescription: string
}

// for post
export interface CreateCategoryDto {
    vacancyCategoryName: string
    vacancyCategoryPictureName: string
    vacancyCategoryDescription: string
}

// for put
export interface UpdateCategoryDto {
    vacancyCategoryId: number
    vacancyCategoryName: string
    vacancyCategoryPictureName: string
    vacancyCategoryDescription: string
}