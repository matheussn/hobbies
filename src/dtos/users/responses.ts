import { Schema } from "mongoose";
import { HobbiesResponse } from "../hobbies/response";

export interface UserResponse {
    id: Schema.Types.ObjectId
    name: string,
    hobbies?: HobbiesResponse[]
}