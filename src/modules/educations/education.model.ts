import mongoose, { Document, Schema } from "mongoose";

// Define the Education interface
export interface IEducation extends Document {
  title: string; // e.g., "Bachelor of Science in Computer Science"
  institution: string; // e.g., "XYZ University"
  degree: string; // e.g., "B.Sc."
  description: string; // e.g., "A program focusing on computer science principles"
  image?: string; // e.g., "https://example.com/image.jpg"
  link?: string; // e.g., "https://example.com/education-details"
  certificate?: string; // e.g., "https://example.com/certificate-url"
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the Education schema
const educationSchema: Schema = new Schema(
  {
    title: { type: String, required: true },
    institution: { type: String, required: true },
    degree: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: false }, // Optional field for an image
    link: { type: String, required: false }, // Optional field for a link
    certificate: { type: String, required: false }, // Optional field for a certificate
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Create the Education model
export const Education = mongoose.model<IEducation>(
  "Education",
  educationSchema
);
