import { Schema } from "mongoose";

export interface UserResponse {
    id: Schema.Types.ObjectId
    name: string,
    hobbies?: HobbiesResponse[]
}

export interface HobbiesResponse {
    id: Schema.Types.ObjectId
    name: string,
    experienceLevel: string,
    year: number
}