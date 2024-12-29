// models/Course.ts
import mongoose, { Schema } from "mongoose";
import { ICourse } from "./courses.interface";

// Define the Mongoose schema and model
const courseSchema: Schema<ICourse> = new Schema(
  {
    title: {
      type: String,
      required: true, // Required
    },
    description: {
      type: String,
      required: true, // Required
    },
    duration: {
      type: String,
      required: false, // Optional
    },
    instructor: {
      type: String,
      required: false, // Optional
    },
    date: {
      type: Date,
      default: Date.now, // Optional
    },
    image: {
      type: String,
      required: false, // Optional
    },
    link: {
      type: String,
      required: false, // Optional
    },
    certificate: {
      type: String,
      required: false, // Optional
    },
  },
  { timestamps: true }
);

// Create the Course model based on the schema
const Course = mongoose.model<ICourse>("Course", courseSchema);

export { Course };
