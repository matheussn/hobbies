import { Document, Schema } from 'mongoose';

export interface Hobbies extends Document {
    _id: Schema.Types.ObjectId
    experienceLevel: string
    name: string
    year: number
}

export enum ExperienceLevel {
    LOW = "low",
    MEDIUM = "medium",
    HIGH = "high",
    VERY_HIGH = "very_high",
}

export const HobbieSchema = new Schema<Hobbies>({
    _id: { type: Schema.Types.ObjectId, required: true },
    experienceLevel: { type: String, required: true, enum: ExperienceLevel, default: ExperienceLevel.LOW },
    name: { type: String, required: true },
    year: { type: Number, required: true }
});
