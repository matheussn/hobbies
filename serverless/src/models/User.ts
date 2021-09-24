import { Document, Schema } from 'mongoose';
import { Hobbies } from './Hobbie';

export interface Users extends Document {
    _id: Schema.Types.ObjectId
    name: string
    hobbies?: Hobbies[]
}

export const UserSchema = new Schema<Users>({
    _id: { type: Schema.Types.ObjectId, required: true },
    name: { type: String, required: true },
    hobbies: [{ type: Schema.Types.ObjectId, ref: 'Hobbies' }],
});