export interface CreateHobbieRequest {
    name: string
    year: number
    experienceLevel: string
}

export interface UpdateHobbieRequest {
    name?: string
    year?: number
    experienceLevel?: string
}