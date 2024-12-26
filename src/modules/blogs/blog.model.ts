import mongoose, { Document, Schema } from "mongoose";
import { IBlog } from "./blog.interface";

interface BlogDocument extends IBlog, Document {}

const BlogSchema: Schema = new Schema<IBlog>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: { type: String, required: false }, // Optional category
    link: { type: String, required: false }, // Optional link
    image: { type: String, required: false }, // Optional image URL
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.model<BlogDocument>("Blog", BlogSchema);
