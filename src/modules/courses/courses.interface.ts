import { Document } from "mongoose";

// Define the TypeScript interface for the Course model
export interface ICourse extends Document {
  title: string;
  description: string;
  duration?: string; // Optional field
  instructor?: string; // Optional field
  date?: Date; // Optional field
  image?: string; // Optional field
  link?: string; // Optional field
  certificate?: string; // Optional field
}
