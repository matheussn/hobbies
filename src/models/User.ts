import { Document, Schema } from 'mongoose';
import { Hobbie } from './Hobbie';

export interface User extends Document {
    _id: Schema.Types.ObjectId
    name: string
    hobbies?: Hobbie[]
}

export const UserSchema = new Schema<User>({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobbie' }],
});