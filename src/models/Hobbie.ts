import { Document, Schema } from 'mongoose';

export interface Hobbie extends Document {
    id: string
    experienceLevel: string
    name: string
    year: number
}

export const HobbieSchema = new Schema<Hobbie>({
    id: { type: String, required: true },
    experienceLevel: { type: String, required: true },
    name: { type: String, required: true },
    year: { type: Number, required: true }
});