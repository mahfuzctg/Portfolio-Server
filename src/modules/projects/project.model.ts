import mongoose, { Document, Schema } from "mongoose";

interface IProject {
  title: string;
  image: string;
  category: string;
  description: string;
  link: string;
  details: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface ProjectDocument extends IProject, Document {}

const ProjectSchema: Schema = new Schema<IProject>(
  {
    title: { type: String, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    details: { type: String, required: true },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

export const Project = mongoose.model<ProjectDocument>(
  "Project",
  ProjectSchema
);
