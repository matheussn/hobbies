import { Schema } from "mongoose";
import { HobbiesResponse } from "../hobbie/response";

export interface UserResponse {
    id: Schema.Types.ObjectId
    name: string,
    hobbies?: HobbiesResponse[]
}