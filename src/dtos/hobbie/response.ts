import { Schema } from "mongoose";

export interface HobbiesResponse {
    id: Schema.Types.ObjectId
    name: string,
    experienceLevel: string,
    year: number
}