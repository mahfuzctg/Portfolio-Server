import { Document, Schema, model } from "mongoose";

// Define Skill schema
const skillSchema = new Schema(
  {
    name: { type: String, required: true },
    level: { type: String, required: true }, // e.g., 'Beginner', 'Intermediate', 'Advanced'
    description: { type: String, required: false },
    image: { type: String, required: true }, // Image is required
  },
  { timestamps: true }
);

// Create and export Skill model
export interface Skill extends Document {
  name: string;
  level: string;
  description?: string;
  image: string; // Image field
}

export const Skill = model<Skill>("Skill", skillSchema);
