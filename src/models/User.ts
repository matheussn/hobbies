import { Hobbie, HobbieSchema } from "./Hobbie";
import { Document, Schema } from 'mongoose';

export interface User extends Document {
    name: string
    hobbies?: Hobbie[]
}

export const UserSchema = new Schema<User>({
    name: { type: String, required: true },
    hobbies: [HobbieSchema],
});