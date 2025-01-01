/* eslint-disable no-redeclare */
import { Document, Schema, model } from "mongoose";

// Define Skill schema
const skillSchema = new Schema(
  {
    name: { type: String, required: false }, // name is required
    level: { type: String, required: false }, // level is optional
    description: { type: String, required: false }, // description is optional
    image: { type: String, required: false }, // image is required
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields
);

// Create and export Skill model
export interface Skill extends Document {
  name: string;
  level?: string; // Optional field
  description?: string; // Optional field
  image: string; // Required field
}

export const Skill = model<Skill>("Skill", skillSchema);
